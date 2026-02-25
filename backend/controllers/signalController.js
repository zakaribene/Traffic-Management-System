import Signal from "../models/signalModel.js";

const create = async (req, res) => {
    try {
        const image = req.file ? req.file.filename : "";

        const signal = await Signal.create({
            location: req.body.location,
            status: req.body.status || "red",
            description: req.body.description,
            img: image
        });

        res.status(201).json(signal);
    } catch (error) {
        console.log(error);
    }
};

const getAll = async (req, res) => {
    try {
        const signals = await Signal.find();
        res.status(200).json(signals);
    } catch (error) {
        console.log(error);
    }
};

const getOne = async (req, res) => {
    try {
        const signal = await Signal.findById(req.params.id);
        res.status(200).json(signal);
    } catch (error) {
        console.log(error);
    }
};

const update = async (req, res) => {
    try {
        const updateData = {
            location: req.body.location,
            status: req.body.status,
            description: req.body.description
        };
        if (req.file) updateData.img = req.file.filename;

        const updated = await Signal.findByIdAndUpdate(req.params.id, updateData, {
            returnDocument: "after"
        });

        res.status(200).json(updated);
    } catch (error) {
        console.log(error);
    }
};

const remove = async (req, res) => {
    try {
        const deleted = await Signal.findByIdAndDelete(req.params.id);
        res.status(200).json(deleted);
    } catch (error) {
        console.log(error);
    }
};

export default { create, getAll, getOne, update, remove };