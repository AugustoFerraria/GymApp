const mongoose = require('mongoose');

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/GymApp';

        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => {
                console.log('Database connection successful');
            })
            .catch(err => {
                console.error('Database connection error:', err);
            });
    }
}

module.exports = new Database();
