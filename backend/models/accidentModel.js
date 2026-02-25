import mongoose from "mongoose"

const accidentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    vehicleNumber:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    img:{
        type:String,
        default:""   // optional, haddii user uusan file soo dirsane
    },
    date:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("Accident", accidentSchema)