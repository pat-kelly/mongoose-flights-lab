import mongoose from "mongoose";
import { Meal } from '../models/meal.js';
import { Flight } from '../models/flight.js';

function newMeal(req, res){
  Meal.find({})
  .then(meals =>{
    res.render('meals/new', {
      title: "Add new Meal",
      meals,
      req
    })
  })
}

function create(req, res){
  Meal.findOne({name:req.body.name})
  .then(meal =>{
    res.redirect(`/meals/new?err=${meal.name}`);
  })
  .catch(m =>{ 
    Meal.create(req.body)
    .then(meal =>{
      res.redirect('/meals/new');
    })
    .catch(err =>{
      console.error(err);
      res.redirect('/');
    })
  })
}

function delMeal(req, res){
  const removedFrom = [];
  Flight.find({meals: req.params.id})
  .then(flights =>{
    flights.forEach(flight => {
      flight.meals.pull(req.params.id);
      flight.save()
      removedFrom.push(flight.flightNo);
    });//END forEach
    Meal.findByIdAndDelete(req.params.id)
    .then(meal =>{
      res.redirect(`/meals/new/?removedFrom=${removedFrom}&meal=${meal.name}`);
    })
  })
  .catch(()=>{
    Meal.findByIdAndDelete(req.params.id)
    .then(meal =>{
      res.redirect(`/meals/new`);
    })
  })
}

export{
  newMeal as new,
  create,
  delMeal as delete
}