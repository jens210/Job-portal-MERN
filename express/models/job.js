const mongoose = require('mongoose');

let jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  area: {type: mongoose.Schema.Types.ObjectId, ref: 'Area'}
});

module.exports = mongoose.model('Job', jobSchema);
