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
                this._createCollection();
            })
            .catch(err => {
                console.error('Database connection error:', err);
            });
    }

    _createCollection() {
        const db = mongoose.connection;
        db.on('open', () => {
            db.db.listCollections({ name: 'GymApp' })
                .next((err, collinfo) => {
                    if (!collinfo) {
                        db.createCollection('GymApp')
                            .then(() => console.log('Collection GymApp created'))
                            .catch(err => console.error('Error creating collection:', err));
                    }
                });
        });
    }
}

module.exports = new Database();
