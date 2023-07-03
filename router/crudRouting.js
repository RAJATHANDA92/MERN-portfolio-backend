const express = require("express");
const router = express.Router();

require("../db/conn");
const User1 = require("../model/crudSchema");

router.get("/", (req, res) => {
  res.send(`Hello World from the server router.js`);
});
router.get("/api/get", async (req, res) => {
  try {
    const userdata = await User1.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.post("/api/post", async (req, res) => {
  const { name, email, contact } = req.body;

  if (!name || !email || !contact) {
    return res.status(422).json({ error: "please fill the field properly" });
  }

  try {
    const userExist = await User1.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    }
    const userExist1 = await User1.findOne({ contact: contact });
    if (userExist1) {
      return res.status(422).json({ error: "contact already Exist" });
    } else {
      const user = new User1({ name, email, contact });
      await user.save();
      res.status(201).json({ message: `${user.name} user saved Successfully` });
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/api/remove/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteuser = await User1.findByIdAndDelete({ _id: id });
    console.log(deleteuser);
    res.status(201).json(deleteuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.get("/api/get/:id", async (req, res) => {
  try {
    console.log(req.params);
    const id = req.params.id;
    const userindividual = await User1.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json({ data: userindividual });
  } catch (error) {
    res.status(422).json(error);
  }
});

router.put("/api/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateduser = await User1.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateduser);
    res.status(201).json(updateduser);
  } catch (error) {
    res.status(422).json(error);
  }
});
module.exports = router;
