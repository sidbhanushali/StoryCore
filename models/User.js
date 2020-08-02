const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

googleId: { type: String, required: true},
displayName: {type: String, required: true},
firstName: {type: String},
lastName: {type: String},
image: {type: String},
cretedAt: {type: Date, default: Date.now() },

})



module.exports = mongoose.model('User', UserSchema)



