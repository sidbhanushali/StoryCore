
const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,//this will trim any whitespace in the MDB document 
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'public',
    enum: ['public', 'private'], // enum is list of possible values we can set
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', //we need to connect a user to each story post so we will reference the id from the User model
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Story', StorySchema)