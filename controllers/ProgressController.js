const Progress = require('../models/progress');

exports.createProgress = async (req, res) => {
    try {
        const newProgress = new Progress(req.body);
        await newProgress.save();
        res.status(201).send(newProgress);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getProgresses = async (req, res) => {
    try {
        const progresses = await Progress.find().populate('userId').populate('routineId').populate('exerciseId');
        res.status(200).send(progresses);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getProgressById = async (req, res) => {
    try {
        const progress = await Progress.findById(req.params.id).populate('userId').populate('routineId').populate('exerciseId');
        if (!progress) {
            return res.status(404).send();
        }
        res.status(200).send(progress);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateProgress = async (req, res) => {
    try {
        const progress = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!progress) {
            return res.status(404).send();
        }
        res.status(200).send(progress);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteProgress = async (req, res) => {
    try {
        const progress = await Progress.findByIdAndDelete(req.params.id);
        if (!progress) {
            return res.status(404).send();
        }
        res.status(200).send(progress);
    } catch (error) {
        res.status(500).send(error);
    }
};
