import express from "express"
import { createCourse, createLecture, getCourseById, getCourseLecture, getCreatorCourse, getLecById, getPublishCourse, removeLecture, togglePublishCourse, updateCourse, updateLecture } from "../controllers/courseController.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import upload from "../utils/multer.js"

const router = express.Router()

//static
router.route('/create').post(isAuthenticated, createCourse)
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture)
router.route("/lecture/:lectureId").get(isAuthenticated, getLecById)

//dynamic 
router.route("/").get(isAuthenticated, getCreatorCourse)
router.route("/published-courses").get(isAuthenticated, getPublishCourse)
router.route("/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), updateCourse)
router.route("/:courseId").get(isAuthenticated, getCourseById)
router.route("/:courseId/lecture").post(isAuthenticated, createLecture)
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture)
router.route("/:courseId/lecture/:lectureId").put(isAuthenticated, updateLecture)
router.route("/:courseId/publish").patch(isAuthenticated, togglePublishCourse)

export default router