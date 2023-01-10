import mongoose from "mongoose";
import { Movie } from '../models/movie.js';

function index(req, res){
  Movie.find({})
  .then(movies =>{
    res.render('movies/index',{
      movies: movies,
      title: 'All Movies'
    })
  })
  .catch(err =>{
    console.error(err);
    res.redirect('/');
  })
}

function newMovie(req, res){
  res.render('movies/new',{
    title: 'Add Movie'
  })
}

function create(req, res){
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

}

export{
  index,
  newMovie as new,
  create
}