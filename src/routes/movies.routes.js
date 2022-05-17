const {Router} = require("express");
const controllerMovies = require("../controllers/movies.controller");
const routerMovies = Router();

// GET
routerMovies.get('/', controllerMovies.get);

// GET/id
routerMovies.get('/:id', controllerMovies.getById);

// POST
routerMovies.post('/', controllerMovies.insert);

// PUT/id
routerMovies.put('/:id', controllerMovies.update);

// DELETE/id
routerMovies.delete('/:id', controllerMovies.delete);

module.exports = routerMovies;