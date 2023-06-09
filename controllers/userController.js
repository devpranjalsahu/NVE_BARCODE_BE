const User = require("../models/userModel");
const Lot = require("../models/lotModel");


module.exports = {

  endpoints: [
    
  ],
  create: (req, res) => {
    const userData = req.body;
    User.create(userData).
        then((data) => {
            res.status(201).json({
                data,
                message: "User created successfully"
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
                message: "Failed to create user"
            });
        });
},
update: (req, res) => {

    const {userData,id} = req.body;
    User.update(userData,{
        where: {
            id
        }
    }).
        then((data) => {
            res.status(201).json({
                data,
                message: "User updated successfully"
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({
                error: error,
                message: "Failed to update user"
            });
        });
},
delete: (req, res) =>{
    const {id} = req.query;

    User.destroy({
        where:{
            id
        }
    }).then(data=>{
        res.status(200).json({
            message:"Deleted Successfully!"
        })
    })
},
getAll: (req, res) => {
    User.findAll().then(data => {
        res.status(200).json({
            users:data
        });
    }).catch((error) => {
        console.log(error);
        res.status(400).json({
            error: error,
            message: "Bad request"
        });
    });
},
get: (req, res) => {
    const {id} = req.query;
    User.findByPk(id).then(user=>{
        res.json({
            user
        })
    }).catch(error=>{
        console.log(error);
        res.status(400).json({
            error: error,
            message: "Bad request"
        });
    })
} 
};