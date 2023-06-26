const express = require("express");
const cors = require("cors");



const app = express();
cors({ origin: true, credentials: true })
app.use(cors({ origin: true, credentials: true }));

const adminRouter = require("./adminRoutes");
const authRouter = require("./authRoutes");
const poRouter = require("./poRoutes");
const lotRouter = require("./lotRoutes");
const entryRoutes = require("./entryRoutes");
const csvRoutes = require("./csvRoutes");

app.use('/p',(req,res)=>{
    res.send("admin")
})
app.use("/admin", adminRouter);
app.use("/lot", lotRouter);
app.use("/auth", authRouter);
app.use("/po",poRouter );
app.use("/entry", entryRoutes);
app.use("/csv", csvRoutes);


module.exports = app;
