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

export const updateLectureProgress = async (req, res) => {
    try {
        const {courseId, lectureId} = req.params
        const userId = req.id 
        // fetch or create coirse progress
        let courseProgress = await Course.findOne({courseId, userId})
        if (!courseProgress) { // if no progress exists
            courseProgress = new CourseProgress({
                userId,
                courseId,
                completed:false,
                lectureProgress:[],
            })
        }

        // find the lecture progress in the course progress
        const lectureIndex = courseProgress.lectureProgress.findIndex((lecture) => lecture.lectureId )
            if (lectureIndex !== -1) { 
                // if lecture already exists , update its status
                courseProgress.lectureProgress[lectureIndex].viewed = true;
            }else{
                // Add new lecture progress
                courseProgress.lectureProgress.push({
                    lectureId,
                    viewed:true,
                })
            }
            // IF ALL LECTURES ARE VIEWED 
            const lectureProgressLength = courseProgress.lectureProgress.filter((lectureProg)=>lectureProg.viewed).length
            const course = await Course.findById(courseId)
            if (course.lectures.length === lectureProgressLength) courseProgress.completed = true;
            await courseProgress.save()
            return res.status(200).json({
                message:"Lecture Progress Updated successfully"
            })
        } catch (error) {
        console.log(error);

        
    }
}

export const markAsCompleted = async (req, res) => {
    try {
        const {courseId} = req.params
        const userId = req.body

        const courseProgress = await Course.findOne({courseId, userId})
        if (!courseProgress) return res.status(404).json({message:"Course progress not found"})
            courseProgress.lectureProgress.map((lectureProgress)=>lectureProgress.viewed = true)
        courseProgress.completed = true
        courseProgress.completed = true
        courseProgress.completed = true
        courseProgress.completed = true
    } catch (error) {
        console.log(error);
        
    }
}