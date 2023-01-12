import mongoose from "mongoose";
import { Meal } from '../models/meal.js';

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

export{
  newMeal as new,
  create
}