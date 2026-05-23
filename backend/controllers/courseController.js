import  {Course}  from "../models/course.model.js"
import { uploadMedia } from "../utils/cloudinary.js"

export const createCourse = async (req, res) => {
    try {
        const {courseTitle, category} = req.body
        if (!courseTitle || !category) {
            return res.status(400).json({
                message:"Course title and category are required"
            })
        }
        const course = await Course.create({
            courseTitle,
            category,
            creator:req.id
        })
        return res.status(201).json({
            course,
            message:"Course created"
        })
    } catch (error) {
        return res.status(500).json({
            message:"Course not created"
        })
    }
}

export const getCreatorCourse = async (req, res) => {
    try {
        const userId = req.id
        const courses = await Course.find({creator:userId})
        if (!courses) {
            return res.status(404).json({
                course:[],
                message:"Course not found"
            })
        }
        return res.status(200).json({
            courses,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to create course"
        })
    }
}

export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
    const thumbnail = req.file;
    let updateData = { courseTitle, subTitle, description, category, courseLevel, coursePrice };

    if (thumbnail) {
      const uploadResponse = await uploadMedia(thumbnail.path);
      updateData.courseThumbnail = uploadResponse.secure_url;
    }


    const course = await Course.findByIdAndUpdate(
      courseId,
      { courseTitle, subTitle, description, category, courseLevel, coursePrice },
      { new: true }
    );

    if (!course) return res.status(404).json({ message: "Course not found" });

    return res.status(200).json({ course, message: "Course updated successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};