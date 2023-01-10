import { Router } from 'express'
import * as moviesCtrl from "../controllers/movies.js";

const router = Router()

/* GET movies listing. */
//GET /movies
router.get('/', moviesCtrl.index);

// GET /movies/new
router.get('/new', moviesCtrl.new);

// POST /movies
router.post('/', moviesCtrl.create);

export {
  router
}
