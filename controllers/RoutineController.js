const Routine = require("../models/Routine");
const User = require("../models/User");
const Exercise = require("../models/Exercise");

exports.createRoutine = async (req, res) => {
  const { name, description, studentId, professorId, exercises } = req.body;

  try {
    const student = await User.findById(studentId);
    const professor = await User.findById(professorId);

    if (!student || student.role !== "user") {
      return res.status(400).json({ msg: "Studente non valido" });
    }

    if (!professor || professor.role !== "admin") {
      return res.status(400).json({ msg: "Professore non valido" });
    }

    const newRoutine = new Routine({
      name,
      description,
      student: studentId,
      professor: professorId,
      exercises,
    });

    await newRoutine.save();

    res.status(201).json(newRoutine);
  } catch (error) {
    console.error("Error al crear la rutina:", error);
    res.status(500).json({ msg: "Errore del server" });
  }
};
exports.getStudentRoutines = async (req, res) => {
  const { studentId } = req.params;

  try {
    const routines = await Routine.find({ student: studentId }).populate(
      "exercises.exerciseId",
      "name"
    );

    if (!routines) {
      return res.status(404).json({ msg: "Routine non trovate" });
    }

    res.json(routines);
  } catch (error) {
    console.error("Error al obtener las rutinas:", error);
    res.status(500).json({ msg: "Errore del server" });
  }
};
exports.getRoutineById = async (req, res) => {
  const { id } = req.params;

  try {
    const routine = await Routine.findById(id).populate(
      "exercises.exerciseId",
      "name"
    );

    if (!routine) {
      return res.status(404).json({ msg: "Routine non trovata" });
    }

    res.json(routine);
  } catch (error) {
    console.error("Error al obtener la rutina:", error);
    res.status(500).json({ msg: "Errore del server" });
  }
};
exports.updateRoutine = async (req, res) => {
  const { id } = req.params;
  const { name, description, exercises } = req.body;

  try {
    let routine = await Routine.findById(id);

    if (!routine) {
      return res.status(404).json({ msg: "Routine non trovata" });
    }

    routine.name = name || routine.name;
    routine.description = description || routine.description;
    routine.exercises = exercises || routine.exercises;

    await routine.save();

    res.json(routine);
  } catch (error) {
    console.error("Error al actualizar la rutina:", error);
    res.status(500).json({ msg: "Errore del server" });
  }
};

exports.deleteRoutine = async (req, res) => {
  const { id } = req.params;

  try {
    const routine = await Routine.findById(id);

    if (!routine) {
      return res.status(404).json({ msg: "Routine non trovata" });
    }

    await routine.remove();

    res.json({ msg: "Routine eliminata" });
  } catch (error) {
    console.error("Error al eliminar la rutina:", error);
    res.status(500).json({ msg: "Errore del server" });
  }
};