const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  title: String,
  id: String,
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
  status: String,
  userId: Schema.Types.ObjectId,
  date: Date,
})

TaskSchema.pre('save', function(next){
  this.tags = this.tags.map(function(option) { return option._id; });
  next();
});

module.exports = mongoose.models.Task || mongoose.model('Task', TaskSchema );

