import express from "express"
import accidentController from "../controllers/accidentController.js"
import uploadImage from "../middleware/Upload.js    "

const router = express.Router()

// POST accident with image
router.post("/", uploadImage.single("img"), accidentController.create)

// GET all accidents
router.get("/", accidentController.Getall)

// DELETE accident by ID
router.delete("/:id", accidentController.Delete)

export default router