import { Course } from "../models/course.model";
import { CourseProgress } from "../models/courseProgress.model";

export const getCourseProgress = async (req, res) => {
    try {
        const {courseId} = req.params
        const userId = req.body
        // Step-1 fetch the user's course progress
        const courseProgress = await CourseProgress.findOne({courseId, userId}).populate("courseId")
        const courseDetail = await Course.findById(courseId)

        if (!courseDetail) {
            return res.status(404).json({
                message:"Course not found"
            })
        }
        // Step-2 if no progress , return course detail with empyty progress
        if (!courseProgress) {
            return res.status(200).json({
                data:{
                    courseDetail,
                    progress:[],
                    completed:false
                }
            })
        }
        // step-3 return the user course progress along with course detail

        return res.status(200).json({
                data:{
                    courseDetail,
                    progress:courseProgress.lectureProgress,
                    completed:courseProgress.completed
                }
            })

    } catch (error) {
        console.log(error);
        
    }
}

export const update