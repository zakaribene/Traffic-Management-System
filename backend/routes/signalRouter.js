import express from "express";
import signalController from "../controllers/signalController.js";
import uploadImage from "../middleware/Upload.js";

const router = express.Router();

// Create signal with optional image
router.post("/", uploadImage.single("img"), signalController.create);

// Get all signals
router.get("/", signalController.getAll);

// Get one signal
router.get("/:id", signalController.getOne);

// Update signal (with optional image)
router.put("/:id", uploadImage.single("img"), signalController.update);

// Delete signal
router.delete("/:id", signalController.remove);

export default router;