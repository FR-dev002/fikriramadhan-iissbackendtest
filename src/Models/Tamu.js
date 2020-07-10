const mongoose = require('mongoose');
const schema = new mongoose.Schema({
   name: {
      type: String,
      require: true,
      unique: true,
   },
   address: {
      type: String,
      require: true
   },
   phone_number: {
      type: String,
      require: true,
      unique: true
   },
   status: {
      type: Boolean,
      require: true
   }
});

module.exports = mongoose.model('Tamu', schema);