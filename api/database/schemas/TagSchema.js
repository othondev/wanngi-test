const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
  title: { type:String, unique: true},
  userId: Schema.Types.ObjectId,
  date: Date,
})

module.exports = mongoose.models.Tag || mongoose.model('Tag', TagSchema );
