const express = require('express');
require('dotenv').config();
const InitDb = require('./config/databaseConfig');
const userRoutes = require('./routes/userRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const progressRoutes = require('./routes/progressRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', userProfileRoutes);
app.use('/api', progressRoutes);
app.use('/api', exerciseRoutes);


InitDb;

require('./models'); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
