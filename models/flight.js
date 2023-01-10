import mongoose from "mongoose";
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  airline: String,
  airport: String,
  flightNo: Number,
  departs: Date

}, {timestamps: true})

const Flight = mongoose.model('Flight', movieSchema);

export{
  Flight
}