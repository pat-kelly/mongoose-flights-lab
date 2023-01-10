import mongoose from "mongoose";
import { Flight } from '../models/flight.js';

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
    title: 'Add Flight'
  })
}

/* function create(req, res){
  //turn nowShowing into a bool - if it's there, it'll be false, otherwise, true.
  req.body.nowShowing = !!req.body.nowShowing;
  //split the string into an array for the cast.
  if(req.body.cast)
    req.body.cast = req.body.cast.split(', ');
  
  for( let key in req.body ){
    if(req.body[key] === '') delete req.body[key];
  }

  Movie.create(req.body)
  .then(movie =>{
    res.redirect('/movies');
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/movies');
  })

} */

export{
  index,
  newFlight as new,
  // create
}