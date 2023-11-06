const express = require("express");
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
require("dotenv").config();
// create new user for signup endpoint /api/auth/createuser method:POST
router.post("/createuser", async (req, res) => {
  try {
    // checking whether user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .send({ msg: "user with this email id already exist" });
    }
    let bodyPassword = req.body.password;
    if (!bodyPassword) {
      return res.status(400).send({ msg: "email and password required" });
    }
    //hashing password for security reasons
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(bodyPassword, salt);
    // creating new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPassword,
      gender: req.body.gender,
    });

    // creating jwt token
    const data = {
      user: {
        id: user.id,
      },
    };

    const authToken = Jwt.sign(data, process.env.SEC_TOKEN_KEY);
    res.send({ success: "signed up successfully", authToken });
    //handling errors
  } catch (error) {
    if (error.keyValue) {
      res.status(400).send({ msg: "user with this email id already exists" });
    } else if (error.errors.name) {
      res.status(400).send({ msg: "name is required" });
    } else if (error.errors.email) {
      res.status(400).send({ msg: "email is required" });
    } else if (error.errors.password) {
      res.status(400).send({ msg: "please create password" });
    } else {
      res.status(500).send({ msg: "something went wrong !" });
    }
  }
});

// login end point for user to get access to application api/auth/login method:POST
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ msg: "email and password required" });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "invalid email or password" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send({ msg: "invalid email or password" });
    }
    // creating jwt token
    const data = {
      user: {
        id: user.id,
      },
    };

    const authToken = Jwt.sign(data, process.env.SEC_TOKEN_KEY);
    res.send({ success: "Logged in successfully", authToken });
  } catch (error) {
    res.status(500).send({ msg: "something went wrong" });
  }
});

//fetching userdetails with authorization /api/auth/getuser method:POST
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send({ success: true, user });
  } catch (error) {
    res.status(500).send({ msg: "something went wrong!" });
  }
});
module.exports = router;
