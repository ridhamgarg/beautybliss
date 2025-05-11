const User = require("../models/user");
const jwt = require('jsonwebtoken');

const signInUser = async (req, res) => {
  const {name, email, password} = req.body;
  const findUser = await User.find({email});
    if (findUser.length > 0) {
        res.render("login", { message: "User already exists" });
    }
    const newUser = new User({
        name,
        email,
        password
    });
    await newUser.save();
    res.render("login", { message: "User created successfully now you may login to the application" });
};

const logInUser = async (req, res) => {
    const {email, password} = req.body;
    const findUser = await User.findOne({email, password});
    if (!findUser) {
        res.render("login", { message: "User not found or incorrect credentials" });
    }
    const token = jwt.sign({ name:findUser.name, email:findUser.email }, 'beautybliss');
    res.cookie("token", token);
    res.redirect("/");
  };


module.exports = {
 signInUser,
 logInUser,
};
