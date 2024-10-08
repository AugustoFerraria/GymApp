const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const InitDb = require("./config/DataBaseConfig");
const userRoutes = require("./routes/UserRoutes");
const progressRoutes = require("./routes/progressRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const authRoutes = require("./routes/authRoutes");
const routineRoutes = require("./routes/routineRoutes");
const auth = require("./middleware/auth");

app.use("/api", userRoutes);
app.use("/api", progressRoutes);
app.use("/api", exerciseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/routines", routineRoutes);

app.get("/api/protected", auth, (req, res) => {
  res.send("This route is protected");
});

InitDb;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});