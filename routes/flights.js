import { Router } from 'express'
import * as flightsCtrl from "../controllers/flights.js";

const router = Router()

/* GET flights listing. */
//GET /flights
router.get('/', flightsCtrl.index);

// GET /flights/new
router.get('/new', flightsCtrl.new);

// POST /flights
router.post('/', flightsCtrl.create);

// DELETE /flights/:id
router.delete('/:id', flightsCtrl.delete);

// GET /flights/:id
router.get('/:id', flightsCtrl.show);

// GET /flights/:id/edit
router.get('/:id/edit', flightsCtrl.edit);

// PUT /flights/:id
router.put('/:id', flightsCtrl.update);

// POST /flights/:id/tickets
router.post('/:id/tickets', flightsCtrl.createTicket);

// DELETE /flights/:id/tickets/:id
router.delete('/:fId/tickets/:tId', flightsCtrl.delTicket);

// PUT /flights/:id/meals
router.post('/:id/meals', flightsCtrl.addMeal);

export {
  router
}
