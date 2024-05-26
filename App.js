const express = require('express');
require('dotenv').config();
const InitDb = require('./config/databaseConfig');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', userRoutes);

// Inicializar la conexión a la base de datos
InitDb;

// Cargar modelos y crear colecciones si es necesario
require('./models'); // Esto se asegura de que todos los modelos están registrados

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
