var express = require('express');
var mongoose = require('mongoose')
var app = express()
var cors = require('cors')
app.use(cors())
app.use(express.json())

//create a root path
app.get('/',(req,res)=>{res.send("welcome")})

//open the port
app.listen(8080,()=>{console.log("server connected");
})

//connect mongodb
mongoose.connect('mongodb+srv://shabila:shabi@cluster0.rcxvv.mongodb.net/').then(()=>{console.log("DB connected")}).catch((err)=>console.log((err)))

//create schema
let data= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    amount:Number
})

//create model
let Data=mongoose.model("test",data)

// API for fetching the data
app.get('/data',(req,res)=>{Data.find().then((item)=>res.send(item))})

//API for creating data
app.post('/Create',(req,res)=>{Data.create(req.body).then((item)=>res.send(item))})

//API for delete data
app.delete('/delete/:id', async (req,res)=>{
    try{
        await Data.findByIdAndDelete(req.params.id);
        res.send({message: "Data deleted successfully"});
    } catch(error){
        res.status(500).send({message: "Error deleting data",error});
    }
});

//API to update data
app.put('/update/:id', async (req, res)=> {
    try{
        const updatedItem=await Data.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.send(updatedItem);
    } catch (error){
        res.status(500).send({ message: "Error updating data", error});
    }
});