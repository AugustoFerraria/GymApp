const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoutineSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  student: { type: Schema.Types.ObjectId, ref: "User", required: true },
  professor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  exercises: [
    {
      exerciseId: {
        type: Schema.Types.ObjectId,
        ref: "Exercise",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  videos: [
    {
      url: {
        type: String,
        required: false,
      },
      description: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Routine", RoutineSchema);
