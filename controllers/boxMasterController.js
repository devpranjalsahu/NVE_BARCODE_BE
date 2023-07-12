const Joi = require('joi')

const boxMaster = require('../models/boxMasterModel')


module.exports ={

create:async (req, res)=>{
    const {data} = req.body;
    boxMaster.create(data).
    then((data) => {
        res.status(201).json({
            data,
            message: "BoxMaster created successfully"
        });
    })
    .catch((error) => {
        res.status(400).json({
            error: error,
            message: "Failed to create box master"
        });
    });
   
},
update:async (req, res)=>{
    const {data,id} = req.body;
    boxMaster.update(data,{where:{
        id
    }}).
    then((data) => {
        res.status(201).json({
            data,
            message: "BoxMaster updated successfully"
        });
    })
    .catch((error) => {
        res.status(400).json({
            error: error,
            message: "Failed to update box master"
        });
    });
   
},

getOne: async (req, res)=>{
    const {id} = req.query;
    const data = await boxMaster.findOne({
        where:{
            id
        },
        attributes:{
            exclude:['createdAt','updatedAt']
        }
    })
    res.json({boxMaster:data})
},
getAll: async(req, res)=>{
    boxMaster.findAll().then(data => {
        res.status(200).json({
            boxMasters:data
        });
    }).catch((error) => {
        console.log(error);
        res.status(400).json({
            error: error,
            message: "Bad request"
        });
    });
}

}