const express = require('express');
require('dotenv').config(); // Asegúrate de que dotenv esté configurado aquí

console.log(`Mongo URI: ${process.env.MONGO_URI}`);
console.log(`JWT Secret: ${process.env.JWT_SECRET}`);

const InitDb = require('./config/databaseConfig');
const userRoutes = require('./routes/userRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const progressRoutes = require('./routes/progressRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const authRoutes = require('./routes/authRoutes'); // Agregar rutas de autenticación
const auth = require('./middleware/auth'); // Middleware de autenticación

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', userProfileRoutes);
app.use('/api', progressRoutes);
app.use('/api', exerciseRoutes);
app.use('/api/auth', authRoutes); // Usar rutas de autenticación

// Proteger rutas específicas
app.get('/api/protected', auth, (req, res) => {
  res.send('This route is protected');
});

// Inicializar la conexión a la base de datos
InitDb;

// Cargar modelos y crear colecciones si es necesario
require('./models'); // Esto se asegura de que todos los modelos están registrados

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
