const boxMaster = require('../models/boxMasterModel')


module.exports ={

getOne: async (req, res)=>{
    const {type} = req.query;
    const boxMaster = await boxMaster.findOne({
        where:{
            type
        },
        attributes:{
            exclude:['createdAt','updatedAt']
        }
    })
    res.json({boxMaster})
}

}