import express from "express"
import userController from "../controllers/userController.js"
import uploadImage from "../middleware/Upload.js"

const router = express.Router()

router.post("/", uploadImage.single("img"), userController.create)
router.post("/login", userController.login)
router.get("/", userController.Getall)
router.delete("/:id", userController.Delete)

export default router