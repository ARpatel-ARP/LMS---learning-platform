import express from "express"
import { createCourse, getCreatorCourse } from "../controllers/courseController.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"

const router = express.Router()

router.route('/').post(isAuthenticated, createCourse)
router.route("/").get(isAuthenticated, getCreatorCourse)
export default router