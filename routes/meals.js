import { Router } from 'express'
import * as mealsCtrl from "../controllers/meals.js";

const router = Router();

// GET /meals/new
router.get('/new', mealsCtrl.new);

// POST /meals
router.post('/', mealsCtrl.create);

// DELETE /meals/new/:id
router.delete('/new/:id', mealsCtrl.delete);

export {
  router
}
