const jsonwebtoken = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')



const PO = require('../models/purchaseOrderModel')
const PQ = require('../models/packedQuantityModel')
const BQ = require('../models/balanceQuantityModel')
const data = require('../NVEBARCODE.json')

const Lot = require('../models/lotModel')
const Admin = require('../models/adminModel')
const Nvelot = require('../NVELOT.json')
const JSONStream = require('JSONStream');
const parser = JSONStream.parse('*');


// console.log('hi',__dirname)
module.exports = {
    create: (req, res) => {
        const userData = req.body;
        Admin.create(userData).
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
    login: async (req, res) =>{
    const {username, password} = req.body;
    if(!username ||!password){
        return res.status(400).json({message:'Please enter all fields'});
    }
    const user = await Admin.findOne({where: {username, password},
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



    },
    loadLots: (req, res) => {
        Lot.bulkCreate(Nvelot).then(data =>{
            res.status(201).json(data)
        }).catch(err =>{
            console.log(err)
            res.status(400).json(err);
        })
    },
    getPOFiles: (req, res)=>{
       const list =  fs.readdirSync(path.join(__dirname,'../../MOG_JSON/'), {withFileTypes: true})
.filter(item => !item.isDirectory())
.map(item => item.name);

res.status(200).json({
    list
})
    },
    loadPOs: (req, res)=>{
        const file = req.files?.file;
        const {method, fileName} = req.body;

        let tempFilePath;
        let data;
        if(method==='drag')
        {
            tempFilePath = file.tempFilePath;
         console.log(tempFilePath)

        }
        else 
       {
         tempFilePath = path.join(__dirname,'../../MOG_JSON',fileName)
         console.log(tempFilePath)
        }
        const jsonStream = fs.createReadStream(tempFilePath);
        jsonStream.pipe(parser)
        .on('data', async (d) => {
            try{
                    const po = await PO.create(d)
                    await PQ.create({
                        ...d,
                        purchaseOrderId:po.id,
                        TOT_QTY:"0"
                    },{fields:[
                        'purchaseOrderId','SOL','FCUS','TYP','SUP','FACT','PO','SEA','STY','DES','SIZE','LOT','CLR','DIM','TOT_QTY',
                    ]})
                    await BQ.create({...d,purchaseOrderId:po.id})
                }
                    catch(err){
                        console.log(err)
                    }
        })
        .on('end', () => {
          
            res.status(201).json({
                message: "POs loaded"
               })
        });
       
    },



}