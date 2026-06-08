  import { Course } from "../models/course.model.js";
  import {CourseProgress} from "../models/courseProgress.model.js"
  import { Lecture } from "../models/lecture.model.js";
  import { deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

  export const createCourse = async (req, res) => {
    try {
      const { courseTitle, category } = req.body;
      if (!courseTitle || !category) {
        return res.status(400).json({
          message: "Course title and category are required",
        });
      }
      const course = await Course.create({
        courseTitle,
        category,
        creator: req.id,
      });
      return res.status(201).json({
        course,
        message: "Course created",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Course not created",
      });
    }
  };

  export const getCreatorCourse = async (req, res) => {
    try {
      const userId = req.id;
      const courses = await Course.find({ creator: userId });
      if (!courses) {
        return res.status(404).json({
          course: [],
          message: "Course not found",
        });
      }
      return res.status(200).json({
        courses,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Failed to create course",
      });
    }
  };

  export const updateCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const {
        courseTitle,
        subTitle,
        description,
        category,
        courseLevel,
        coursePrice,
      } = req.body;
      const thumbnail = req.file;

      let updateData = {
        courseTitle,
        subTitle,
        description,
        category,
        courseLevel,
        coursePrice,
      };

      if (thumbnail) {
        // Fetching existing course to get old thumbnail public_id
        const existingCourse = await Course.findById(courseId);

        if (existingCourse?.courseThumbnail) {
          // Extracting public_id from the Cloudinary URL and delete it
          const publicId = existingCourse.courseThumbnail
            .split("/")
            .pop()
            .split(".")[0];
          await deleteMediaFromCloudinary(publicId);
        }

        // new thumbnail
        const uploadResponse = await uploadMedia(thumbnail.path);
        updateData.courseThumbnail = uploadResponse.secure_url;
      }

      const course = await Course.findByIdAndUpdate(courseId, updateData, {
        new: true,
      });

      if (!course) return res.status(404).json({ message: "Course not found" });

      return res
        .status(200)
        .json({ course, message: "Course updated successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const getCourseById = async (req, res) => {
    try {
      const { courseId } = req.params;
      const course = await Course.findById(courseId)
        .populate("creator", "name")
        .populate("lectures");

      if (!course) {
        return res.status(404).json({
          message: "Course not found",
        });
      }
      return res.status(200).json({
        course: {
          ...course.toObject(),
          subTitle: course.subTitle ?? "", // ✅ never sends undefined
          description: course.description ?? "",
          courseLevel: course.courseLevel ?? "",
          coursePrice: course.coursePrice ?? "",
          courseThumbnail: course.courseThumbnail ?? "",
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to get course by id",
      });
    }
  };

  export const createLecture = async (req, res) => {
    try {
      const {lectureTitle} = req.body
      const {courseId} = req.params

      if (!lectureTitle || !courseId) {
        return res.status(400).json({
          message:"Lecture title is required"
        })
      }
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      // create lecture
      const lecture = await Lecture.create({lectureTitle})
      
        course.lectures.push(lecture._id)
        await course.save()

        // update courseprogress after adding new lecture
        await CourseProgress.updateMany(
      { courseId, completed: true },
      { $set: { completed: false } }
    );

      return res.status(201).json({
        lecture,
        message:"Lecture created successfully"
      })
    } catch (error) {
      console.error("createLecture error:", error);
      return res.status(500).json({
        message: "Failed to create lecture",
      });
    }
  }

  export const getCourseLecture = async (req, res) => {
    try {
      const {courseId} = req.params
      const course = await Course.findById(courseId).populate("lectures")
      if (!course) {
        return res.status(404).json({
          message:"Course not found",

        })
      }
      return res.status(200).json({
        lectures: course.lectures
      })
    } catch (error) {
      return res.status(500).json({
        message: "Failed to get lecture",
      });
    }
  }
  export const updateLecture = async (req, res) => {
      console.log("FULL BODY:", req.body);
    console.log("videoInfo:", req.body.videoInfo);
    try {
      const {lectureTitle, videoInfo, isPreviewFree} = req.body
      const {courseId, lectureId} = req.params;
      const lecture = await Lecture.findById(lectureId)
      if (!lecture) {
        return res.status(404).json({
          message:"Lecture not found"
        })
      }
      console.log("req.body:", req.body);
  console.log("videoInfo:", videoInfo);
      // update lecture
      if (lectureTitle) lecture.lectureTitle = lectureTitle
      if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl
      if(videoInfo?.publicId) lecture.publicId = videoInfo.publicId
      if(isPreviewFree !== undefined) lecture.isPreviewFree = isPreviewFree
      console.log("Lecture before save:", lecture);

      await lecture.save()

      const course = await Course.findById(courseId)
      if (course && !course.lectures.includes(lecture._id)) {
        course.lectures.push(lecture._id)
        await course.save()
      }

      return res.status(200).json({
        lecture,
        message:"Lecture updated successfully"
      })
    } catch (error) {
      return res.status(500).json({
        message: "Failed to Update lecture",
      });
    }
  }

  export const removeLecture = async (req, res) => {
    try {
      const {lectureId} = req.params
      const lecture = await Lecture.findByIdAndDelete(lectureId)
      if (!lecture) {
        return res.status(404).json({
          message:"Lecture not found"
        })
      }
      console.log("lecture.publicId:", lecture.publicId); 
      // delete media from cloudinary 
      if (lecture.publicId) {
        await deleteVideoFromCloudinary(lecture.publicId)
      }
      // Remove the lec reference in the course
      await Course.updateOne(
        {lectures:lectureId},
        {$pull:{lectures:lectureId}}
      )
      return res.status(200).json({
        message:"Lecture removed successfully."
      })

    } catch (error) {
      return res.status(500).json({
        message: "Failed to remove lecture",
      });
    }
  } 

  export const getLecById = async (req, res) => {
    try {
      const {lectureId} = req.params
      const lecture = await Lecture.findById(lectureId)
      if (!lecture) {
        return res.status(404).json({
          message:"Lecture not dounf"
        })
      }
      return res.status(200).json({
        lecture
      })
    } catch (error) {
      return res.status(500).json({
        message: "Failed to get lecture",
      });
    }
  }

  export const togglePublishCourse = async (req, res) => {
    try {
      const {courseId} = req.params
      const {publish} = req.query
      const course =  await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({
          message:"Course not found"
        })
      }
      // publish status based on query parameter
      course.isPublished = publish === "true"
      await course.save()
      const statusMessage = course.isPublished ? "Published" : "Unpublished"
      return res.status(200).json({
        message:` Course is ${statusMessage}`
      })
    } catch (error) {
      return res.status(500).json({
        message: "Failed to publish lecture",
      });
    }
  }

  export const getPublishCourse = async (_, res) => {
    try {
      const courses = await Course.find({isPublished:true}).populate({path:"creator", select:"name photoUrl"})
      if (!courses) {
        return res.status(404).json({
          message:"Course not found"
        })
      }
      return res.status(200).json({
        courses,
      })
    } catch (error) {
      return res.status(500).json({
        message: "Failed to get publish courses",
      });
    }
  }