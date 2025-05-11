const User = require("../models/user");
const jwt = require('jsonwebtoken');

const authorizeOnly = async (req, res, next) => {
   const token = req.cookies?.token;
   if (!token) {
     return res.render("login", {
       message: "You must be logged in to access",
     });
   }
    try {
      const decoded = jwt.verify(token, 'beautybliss');
      req.user = decoded;
      next();
    } catch (error) {
      return res.redirect("login", {
         message: "Session expired, please log in again",
      });
    }
  };

  module.exports = {
    authorizeOnly
  };