import mongoose from "mongoose";
import { Flight } from '../models/flight.js';
import { Meal } from "../models/meal.js";

function index(req, res){
  Flight.find({})
  .then(flights =>{
    res.render('flights/index',{
      flights: flights,
      title: 'All Flights'
    })
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/');
  })
}

function newFlight(req, res){
  res.render('flights/new',{
    title: 'Add Flight',
    flight: new Flight()
  })
}

function create(req, res){
  // console.log(req.body);
  // console.log('REQ PARAMS', req.params)
  //remove empties so defaults can take over
  for(let key in req.body){
    if(req.body[key] === '') delete req.body[key];
  }
  Flight.create(req.body)
  .then(flight =>{
    console.log(flight);
    res.redirect('/flights');
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/');
  })
}

function delFlight(req, res){
  // console.log(req.params.id, 'in delete');
  Flight.findByIdAndDelete(req.params.id)
  .then(flight =>{
    res.redirect('/flights');
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/flights');
  })
}

function show(req, res){
  // console.log(req.params.id, 'in show');
  Flight.findById(req.params.id)
  .populate('meals')
  .then(flight =>{
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals =>{
      res.render('flights/show', {
        title: `Flight ${flight.flightNo} with ${flight.airline}`,
        flight,
        meals
      })
    })
    .catch(err =>{
      console.error(err);
      res.redirect('/flights');
    })
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/flights');
  })
}

function edit(req, res){
  // console.log(req.params.id, 'in edit');
  Flight.findById(req.params.id)
  .then(flight =>{
    console.log(flight.departs.toISOString().slice(0,16));
    res.render('flights/edit', {
      title: `Edit flight ${flight.flightNo}`,
      flight
    })
  })
}

function update(req, res){
  console.log(req.body, 'in update');
  for(let key in req.body){
    if(req.body[key] === '') delete req.body[key];
  }
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight =>{
    res.redirect(`/flights/${flight._id}`);
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/flights');
  })
}

function createTicket(req, res){
  console.log(req.body);
  req.body.seat = req.body.seat.toUpperCase();
  Flight.findById(req.params.id)
  .then(flight =>{
    flight.tickets.push(req.body);
    flight.save()
    .then(()=>{
      res.redirect(`/flights/${flight._id}`);
    })
    .catch(err =>{
      console.error(err);
      res.redirect('/flights');
    })
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/flights');
  })
}

function delTicket(req, res){
  console.log(req.params.tId, 'ticket id');
  console.log(req.params.fId, 'flight id');
  Flight.findById(req.params.fId)
  .then(flight =>{
    flight.tickets.pull(req.params.tId);
    flight.save()
    .then(flight =>{
      res.redirect(`/flights/${flight._id}`);
    })
    .catch(err =>{
      console.error(err);
      res.redirect('/flights');
    })
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/flights');
  })
}

function addMeal(req, res){
  console.log(req.body, req.params.id, 'in addMeal');
  Flight.findById(req.params.id)
  .then(flight =>{
    flight.meals.push(req.body.mealId);
    flight.save()
    .then(flight =>{
      res.redirect(`/flights/${flight._id}`);
    })
    .catch(err =>{
      console.error(err);
      res.redirect('/flights');
    })
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/flights');
  })
}

export{
  index,
  newFlight as new,
  create,
  delFlight as delete,
  show,
  edit,
  update,
  createTicket,
  delTicket,
  addMeal
}