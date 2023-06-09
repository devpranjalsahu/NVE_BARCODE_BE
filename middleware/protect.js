const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/userModel')
const Admin = require('../models/adminModel')



exports.protect = async (req, res, next) => {
    const userToken = req.headers.authorization;
    if(!userToken) return res.status(400).json({ message: "Please attach token in headers!!" });
    try {
    const userData =  jsonwebtoken.verify(userToken.split(" ")[1], process.env.TOKEN_KEY);
    if (userData) {
        const user = await User.findOne({
            where:{
                username: userData.username
            },
            attributes: { exclude: ['password'] }
        });
        if(user){

          req.user = user;  
          return next();
        }
    }
    }
    catch (err) {
            console.log("not a valid token",err)
            return res.status(401).json({ message: "not a valid token" });
        }
    console.log("not a valid token")
    return res.status(401).json({ message: "not a valid token" });
  };

  exports.isAdmin = async (req, res, next) => {
    const userToken = req.headers.authorization;
    if(!userToken) return res.status(400).json({ message: "Please attach token in headers!!" });
    try {
    const userData =  jsonwebtoken.verify(userToken.split(" ")[1], process.env.TOKEN_KEY);
    if (userData) {
        const user = await Admin.findOne({
            where:{
                username: userData.username
            },
            attributes: { exclude: ['password'] }
        });
        if(user){

          req.user = user;  
          return next();
        }
    }
    }
    catch (err) {
            return res.status(401).json({ message: "not a valid token" });
        }
    
    return res.status(401).json({ message: "not a valid token" });
  };