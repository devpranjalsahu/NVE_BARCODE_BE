const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/userModel');
const { response } = require('../routes');


module.exports = {

login:async (req, res)=>{
    const {username, password} = req.body;
    if(!username ||!password){
        return res.status(400).json({message:'Please enter all fields'});
    }
    const user = await User.findOne({where: {username, password},
    attributes:{
        exclude:['password']
    }});
    if(!user){
        return res.status(400).json({message:'Invalid Credentials'});
    }
    const token = jsonwebtoken.sign(
        { username: user.username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "7d",
        }
      );
      // save user token
      user.token = token;
    
    res.status(200).json({user,token});

}



}