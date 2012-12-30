var mongoose = require('mongoose');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var showSchema = new Schema({
    title    : String
  , place    : String
  , date     : { type: Date, default : Date.now}
  , time	 : String
  , body     : String
});

exports.Show = mongoose.model('Show', showSchema);