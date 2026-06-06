import { Course } from "../models/course.model.js";
import { CourseProgress } from "../models/courseProgress.model.js";

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;
    // Step-1 fetch the user's course progress
    console.log("GET userId:", userId)
console.log("GET courseId:", courseId)
    const courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    }).populate("courseId");
    console.log("GET courseProgress:", courseProgress)
    const courseDetail = await Course.findById(courseId).populate("lectures");

    if (!courseDetail) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    // Step-2 if no progress , return course detail with empyty progress
    if (!courseProgress) {
      return res.status(200).json({
        data: {
          courseDetail,
          progress: [],
          completed: false,
        },
      });
    }
    // step-3 return the user course progress along with course detail

    return res.status(200).json({
      data: {
        courseDetail,
        progress: courseProgress.lectureProgress,
        completed: courseProgress.completed,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    console.log("userId:", userId); // ← check these
    console.log("courseId:", courseId);
    console.log("lectureId:", lectureId);

    let courseProgress = await CourseProgress.findOne({ courseId, userId });
    console.log("found courseProgress:", courseProgress); // ← is it null?

    if (!courseProgress) {
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    }

    // ✅ Safety check — ensure array exists
    if (!Array.isArray(courseProgress.lectureProgress)) {
      courseProgress.lectureProgress = [];
    }

    const lectureIndex = courseProgress.lectureProgress.findIndex(
      (lec) => lec.lectureId?.toString() === lectureId?.toString(),
    );

    console.log("lectureIndex:", lectureIndex);

    if (lectureIndex !== -1) {
      courseProgress.lectureProgress[lectureIndex].viewed = true;
    } else {
      courseProgress.lectureProgress.push({ lectureId, viewed: true });
    }

    const course = await Course.findById(courseId);
    const viewedCount = courseProgress.lectureProgress.filter(
      (lp, index, self) =>
        lp.viewed &&
        self.findIndex(
          (l) => l.lectureId.toString() === lp.lectureId.toString(),
        ) === index,
    ).length;

    console.log("lectures total:", course.lectures.length);
    console.log("viewedCount:", viewedCount);

    if (course.lectures.length === viewedCount) {
      courseProgress.completed = true;
    }

    await courseProgress.save();

    return res.status(200).json({ message: "Lecture progress updated" });
  } catch (error) {
    console.log("updateLectureProgress ERROR:", error); // ← what does this say?
    return res
      .status(500)
      .json({ message: "Failed to update lecture progress" });
  }
};

export const markAsCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress)
      return res.status(404).json({ message: "Course progress not found" });
    courseProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = true),
    );
    courseProgress.completed = true;
    await courseProgress.save();
    return res.status(200).json({
      message: "Course marked as complete",
    });
  } catch (error) {
    console.log(error);
  }
};

export const markAsInCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress)
      return res.status(404).json({ message: "Course progress not found" });
    courseProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = false),
    );
    courseProgress.completed = false;
    await courseProgress.save();
    return res.status(200).json({
      message: "Course marked as Incomplete",
    });
  } catch (error) {
    console.log(error);
  }
};
