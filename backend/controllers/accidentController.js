import Accident from "../models/accidentModel.js"

const create = async (req,res)=>{
    try{
        const image = req.file ? req.file.filename : ""

        const accident = await Accident.create({
            userId:req.body.userId,
            vehicleNumber:req.body.vehicleNumber,
            location:req.body.location,
            description:req.body.description,
            img: image
        })

        res.status(201).json(accident)

    }catch(error){
        console.log(error)
    }
}

const Getall = async (req,res)=>{
    try{
        const get = await Accident.find().populate("userId")
        res.status(200).json(get)
    }catch(error){
        console.log(error)
    }
}

const Delete = async (req,res)=>{
    try{
        const del = await Accident.findByIdAndDelete(req.params.id)
        res.status(200).json(del)
    }catch(error){
        console.log(error)
    }
}

export default { create, Getall, Delete }