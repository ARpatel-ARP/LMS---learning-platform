import express from "express"
import upload from "../utils/multer.js"
import { uploadBuffer } from "../utils/cloudinary.js"

const router = express.Router()

router.route('/upload-video').post(upload.single("file"), async (req, res) => {
    try {
        const result = await uploadBuffer(req.file.buffer)
        return res.status(200).json({
            message:"File uploaded successfully",
            data:result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error while uploading file"
        })
        
    }
    
})
export default router