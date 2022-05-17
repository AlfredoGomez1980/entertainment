const express = require('express');
const dbConnection = require('./configs/db.connection');
const dbMoviesSeed = require('./configs/movies.seed');
const routerMovies = require("./routes/movies.routes");
const app = express();

// Database connection
dbConnection();

// Database seeding
dbMoviesSeed();

// Settings
app.set("name", "entertainment-api");
app.set("port", process.env.port || 3500);

// Middlewares
app.use(express.json());

// Routes
app.use("/api/movies", routerMovies);

module.exports = app;