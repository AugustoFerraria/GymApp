const UserProfile = require('../models/userProfile');

exports.createUserProfile = async (req, res) => {
    try {
        const newUserProfile = new UserProfile(req.body);
        await newUserProfile.save();
        res.status(201).send(newUserProfile);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getUserProfiles = async (req, res) => {
    try {
        const userProfiles = await UserProfile.find().populate('userId');
        res.status(200).send(userProfiles);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getUserProfileById = async (req, res) => {
    try {
        const userProfile = await UserProfile.findById(req.params.id).populate('userId');
        if (!userProfile) {
            return res.status(404).send();
        }
        res.status(200).send(userProfile);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userProfile = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!userProfile) {
            return res.status(404).send();
        }
        res.status(200).send(userProfile);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteUserProfile = async (req, res) => {
    try {
        const userProfile = await UserProfile.findByIdAndDelete(req.params.id);
        if (!userProfile) {
            return res.status(404).send();
        }
        res.status(200).send(userProfile);
    } catch (error) {
        res.status(500).send(error);
    }
};
