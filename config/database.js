const mongoose=require("mongoose");
require("dotenv").config();
module.exports=function () {
    mongoose.connect(process.env.DB_URL,{ useNewUrlParser:true,useUnifiedTopology: true });//useUnifiedTopology: true for update version
    mongoose.connection.on("connected",()=>{
        console.log('db connnnnnnnnnnnnnn');
    }) 
}