const express= require('express');
const app =express();
const DB = require("./config/database");
const User=require("./user");
var cors = require('cors');
var bodyParser=require("body-parser");
var jsonParser=bodyParser.json();

require("dotenv").config();
DB();
app.use(cors());

app.get('/',(req,res) =>{
    User.find().then((data)=>{
        res.json(data);
    })
});
app.get('/a',(req,res) =>{
    res.status(200).json({ message: "Question Registered" });
});

app.get('/edit/:id',(req,res) =>{
    User.find({_id:req.params.id}).then((data)=>{
        res.json(data);
    })
});


app.post('/api',jsonParser,(req,res) =>{
   const data=User({
       name:req.body.name,
       email:req.body.email,
       password:req.body.password
   })
   data.save().then((result)=>{
       res.json(result)
   }).catch(err => console.log(err))
});


app.delete('/api/:id',(req,res) =>{
    User.deleteOne({_id:req.params.id}).then((result)=>{
        res.json(result)
    }).catch(err => console.log(err))
});
app.put('/api/:id',jsonParser,(req,res) =>{
    User.updateOne(
        {_id:req.params.id},
        {$set:{
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }}).then((result)=>{
        res.json(result)
    }).catch(err => console.log(err))
});

app.get("/search/:name",(req,res)=>{
    var regex=new RegExp(req.params.name,"i");
    User.find({name:regex}).then((result)=>{
        res.json(result);
    }).catch(err => console.log(err))
});

app.listen(process.env.PORT,()=>{
    console.log("sever is listenning");
})