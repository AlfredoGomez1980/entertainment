const Movie = require('../models/movie.model');
const movies_info = require('../data/movies.json');

const dbSeed = async () => {
    try {
        // Check if movies collection is empty
        const number_movies = await Movie.find().countDocuments();

        if (number_movies == 0) {
            await Movie.deleteMany({});
            await Movie.insertMany(movies_info);
            console.log('Database successfully seeded');
        } else {
            console.log('Database already populated');
        }        
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbSeed;