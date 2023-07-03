const mongoose = require("mongoose");

const crudSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
});
const User1 = mongoose.model("USER1", crudSchema);

module.exports = User1; 