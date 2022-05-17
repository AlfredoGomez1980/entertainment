const Movie = require('../models/movie.model');

// Gets a collection of movies with some optional filters
exports.get = async (req, res) => {
    
    // Add optional filters
    let includeFilters = false;
    let filters = {};
    
    if (req.query.title) {
        includeFilters = true;
        filters.title = { $regex: '.*' + req.query.title + '.*' , $options: 'i' };        
    }

    if (req.query.yearFrom) {
        includeFilters = true;
        filters.year = { $gte: req.query.yearFrom }; 
    }

    if (req.query.genre) {
        includeFilters = true;
        filters.genre = req.query.genre; 
    }

    // Get movies from database
    try {        
        const movies = await Movie.find(filters);
        res.status(200).json({ success: 'true', message: 'Operation successful', data: {movies: movies} });
    } catch (error) {
        res.status(500).json({ success: 'false', message: error.message, data: null });
    }    
}

// Gets a movie by its Id
exports.getById = async (req, res) => {    
    const movie_id = req.params.id;

    // Validate input
    if (!movie_id) {
        res.status(400).json({ success: 'false', message: 'Data input error', data: null });
    }

    // Get movie from database
    try {
        const movie = await Movie.findById(movie_id);        
        res.status(200).json({ success: 'true', message: 'Operation successful', data: {movie: movie} });
    } catch (error) {
        res.status(500).json({ success: 'false', message: error.message, data: null });
    }    
}

// Inserts a movie in the movies list
exports.insert = async (req, res) => {
    let movie = req.body;

    // Validate input
    if (!movie.title || !movie.director || !movie.genre || !movie.year) {
        res.status(400).json({ success: 'false', message: 'Data input error', data: null });
    }
    
    // Insert the movie in database
    try {        
        const new_movie = new Movie(movie);
        await new_movie.save();
        res.status(200).json({ success: 'true', message: 'Movie successfully inserted', data: {id: new_movie._id} });
    } catch (error) {
        res.status(500).json({ success: 'false', message: error.message, data: null });
    }        
}

// Updates an existing movie
exports.update = async (req, res) => {
    const movie_id = req.params.id;
    let movie_info = req.body;

    // Validate input
    if (!movie_id || !movie_info) {
        res.status(400).json({ success: 'false', message: 'Data input error', data: null });
    }
    
    // Update the movie in database
    try {
        const movie_to_update = await Movie.findByIdAndUpdate(movie_id, movie_info);
        res.status(200).json({ success: 'true', message: 'Movie successfully updated', data: null });
    } catch (error) {
        res.status(500).json({ success: 'false', message: error.message, data: null });
    }
}

// Deletes an existing movie
exports.delete = async (req, res) => {
    const movie_id = req.params.id;
    
    // Validate input
    if (!movie_id) {
        res.status(400).json({ success: 'false', message: 'Data input error', data: null });
    }

    // Delete the specified movie in database
    try {
        const movie_to_delete = await Movie.findByIdAndDelete(movie_id);
        res.status(200).json({ success: 'true', message: 'Movie successfully deleted', data: null });
    } catch (error) {
        res.status(500).json({ success: 'false', message: error.message, data: null });
    }    
}