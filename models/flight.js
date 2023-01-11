import mongoose from "mongoose";
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United']
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN'
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date,
    default: function(){
      let curDate = new Date();
      curDate.setFullYear(curDate.getFullYear()+1);
      curDate.setHours(curDate.getHours()-5);
      return curDate;
    }
  }

}, {timestamps: true})

const Flight = mongoose.model('Flight', movieSchema);

export{
  Flight
}