const express = require("express");

const app = express();

const adminRouter = require("./adminRoutes");
const authRouter = require("./authRoutes");
const poRouter = require("./poRoutes");
const lotRouter = require("./lotRoutes");

app.use('/p',(req,res)=>{
    res.send("admin")
})
app.use("/admin", adminRouter);
app.use("/lot", lotRouter);
app.use("/auth", authRouter);
app.use("/po",poRouter );


module.exports = app;
