const Progress = require("../models/Progress");

exports.createProgress = async (req, res) => {
  const { userId, exerciseId, value, type, date } = req.body;
  if (!userId || !exerciseId || !value || !type || !date) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  try {
    const newProgress = new Progress({
      userId,
      exerciseId,
      [type]: value, // Dynamically set the field based on type
      date,
    });
    await newProgress.save();
    res.status(201).send(newProgress);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getProgresses = async (req, res) => {
  try {
    const progresses = await Progress.find().populate("exerciseId");
    res.status(200).send(progresses);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProgressById = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id).populate(
      "exerciseId"
    );
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
    const progress = await Progress.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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

exports.getProgressesByUserId = async (req, res) => {
  try {
    const { userId, exerciseId } = req.query;
    const filter = { userId };
    if (exerciseId) {
      filter.exerciseId = exerciseId;
    }
    const progresses = await Progress.find(filter).populate("exerciseId");
    if (!progresses.length) {
      return res
        .status(404)
        .send({ message: "No progresses found for this user" });
    }
    res.status(200).send(progresses);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProgressesByUserIdAndExerciseId = async (req, res) => {
  try {
    const { userId, exerciseId } = req.query;
    const progresses = await Progress.find({ userId, exerciseId }).populate('exerciseId');
    if (!progresses) {
      return res.status(404).send({ message: 'No progresses found for this user and exercise' });
    }
    res.status(200).send(progresses);
  } catch (error) {
    res.status(500).send(error);
  }
};