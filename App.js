const express = require('express');
const InitDb = require('./config/databaseConfig');
const app = express()

const port = 3001

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})