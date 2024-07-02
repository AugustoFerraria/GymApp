const Exercise = require('../models/Exercise');

exports.createExercise = async (req, res) => {
  try {
    const newExercise = new Exercise(req.body);
    await newExercise.save();
    res.status(201).send(newExercise);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).send(exercises);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).send();
    }
    res.status(200).send(exercise);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!exercise) {
      return res.status(404).send();
    }
    res.status(200).send(exercise);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise) {
      return res.status(404).send();
    }
    res.status(200).send(exercise);
  } catch (error) {
    res.status(500).send(error);
  }
};