import mongoose from "mongoose";

const signalSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["green", "yellow", "red"],
        default: "red"
    },
    description: {
        type: String,
        default: ""
    },
    img: {
        type: String,  // optional, image of the signal
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Signal", signalSchema);