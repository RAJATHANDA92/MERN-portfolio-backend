const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs'); 

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
    res.send(`Hello World from the router.js`);
  });


  
// --------Asysc and Await method---------


router.post
("/register", async (req, res) => {
  // console.log(req.body)
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "please filled the field properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    }
    const userExist1 = await User.findOne({ phone: phone });
    if (userExist1) {
      return res.status(422).json({ error: "phone already Exist" });
    }
    else if(password != cpassword){
      return res.status(422).json({ error: "Pasword is not match with conform password" });
    }
    else{
    const user = new User({ name, email, phone, work, password, cpassword });
    // console.log("entreedddd")

    await 
user.save
();

    res.status(201).json({ message: `${name} registered successfully` });
  }
 } catch (err) {
    console.log(err);
  }
}); 

//    -----login------

router.post
("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "please filled the data" });
  }

  try {
    const userLogin = await User.findOne({ email: email });
  if(userLogin){

  const isMatch = await bcrypt.compare(password, userLogin.password);

  if (!isMatch) {
    res.json({ error: "Invalid Credentials!" });
  } else {
    let data = {}
    data['name'] = userLogin.name
    data['email'] = userLogin.email
    data['phone'] = userLogin.phone
    data['work'] = userLogin.work
    res.json({ 
      message: `${userLogin.name} login successfully!`,
      userData : data
     });
  }
}
else{
  res.json({ error: "You Have to register First!" });
}
   
  } catch (err) {
    console.log(err);
  }
}); 

  module.exports = router;