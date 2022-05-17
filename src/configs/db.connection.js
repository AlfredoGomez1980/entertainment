const mongoose = require('mongoose');

const dbConnection = async () => {
    try {        
        const databaseEnt = await mongoose.connect('mongodb://localhost:27017/entertainment-db');
        console.log('Database connection established');
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnection;