const MongoLib = require('../lib/mongo');

class MoviesService {
    constructor(){
        this.collection = 'movies';
        this.mongoDB = new MongoLib();
    }

    async getMovies({ tags }){
        const query = tags && { tags: { $in: tags }};
        const movies = await this.mongoDB.getAll(this.collection, query);
        return movies || [];
    }

    async getMovie({ movieId }) {
        console.log(movieId);
        const movie = await this.mongoDB.get(this.collection, movieId);
        console.log(movie);
        return movie || [];
    }

    async createMovie({ movie }) {
        const createdMovieId = await this.mongoDB.create(this.collection, movie);
        console.log(createdMovieId);
        return createdMovieId || [];
    }

    async updateMovie({ movieId, movie } = {}) {
        const updatedMovieId = await this.mongoDB.update(this.collection, movieId, movie);
        return updatedMovieId || [];
    }

    async patchMovie() {
        const updatedMovieId = await Promise.resolve(moviesMock[0].id);
        return updatedMovieId || [];
    }

    async deleteMovie({ movieId }) {
        const deletedMovieId = await this.mongoDB.delete(this.collection, movieId);
        return deletedMovieId || [];
    }

 }

 module.exports = MoviesService;