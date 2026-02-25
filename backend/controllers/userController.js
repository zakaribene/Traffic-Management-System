import User from "../models/userModel.js"

const create = async (req,res)=>{
    try{

        const image = req.file ? req.file.filename : ""

        const user = await User.create({
            name:req.body.name,
            username:req.body.username,
            password:req.body.password,
            role:req.body.role || "user",
            img:image
        })

        res.status(201).json(user)

    }catch(error){
        console.log(error)
    }
}

const login = async (req,res)=>{
    try{

        const user = await User.findOne({
            username:req.body.username,
            password:req.body.password
        })

        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }

        res.status(200).json(user)

    }catch(error){
        console.log(error)
    }
}

const Getall = async (req,res)=>{
    try{
        const get = await User.find()
        res.status(200).json(get)
    }catch(error){
        console.log(error)
    }
}

const Delete = async (req,res)=>{
    try{
        const del = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(del)
    }catch(error){
        console.log(error)
    }
}

export default { create, login, Getall, Delete }