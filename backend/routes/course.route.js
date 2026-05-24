import express from "express"
import { createCourse, createLecture, getCourseById, getCourseLecture, getCreatorCourse, updateCourse } from "../controllers/courseController.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import upload from "../utils/multer.js"

const router = express.Router()

router.route('/create').post(isAuthenticated, createCourse)
router.route("/").get(isAuthenticated, getCreatorCourse)
router.route("/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), updateCourse)
router.route("/:courseId").get(isAuthenticated, getCourseById)
router.route("/:courseId/lecture").post(isAuthenticated, createLecture)
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture)
export default router