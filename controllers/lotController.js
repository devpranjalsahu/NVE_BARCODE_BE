const lotModel = require('../models/lotModel')


module.exports ={

getOne: async (req, res)=>{
    const {LOT} = req.query;
    console.log(LOT)
    const lot = await lotModel.findOne({
        where:{
            LOT
        },
        attributes:{
            exclude:['id','LOT','createdAt','updatedAt']
        }
    })
    res.json({lot})
}

}