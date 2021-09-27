const express= require('express')
const app = express();
const cors = require('cors')
require('dotenv').config()
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const url =process.env.MongoDb_url;

const PORT = process.env.PORT || 3005;

app.use(cors({
    origin: "*"
  }))

  app.use(express.json())
  console.log("hello")

app.get("/mentors",async function (req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("class_app")
        //select  the collection and perform action
        let data =await db.collection("mentor").find({userid : req.userid}).toArray()
        //close the database
        client.close();

        res.json(data)
    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

app.get("/mentors/:id",async function (req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("class_app")
        //select  the collection and perform action => find the particular ID and populate it
        let data =await db.collection("mentor").findOne({_id : mongodb.ObjectId(req.params.id)});
        //close the database
        client.close();

        res.json(data)
    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

app.post("/create-mentor",async function(req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("class_app")
        //select  the collection and perform action
        req.body.userid=req.userid;
        let data =await db.collection("mentor").insertOne(req.body)
        // console.log(data)
        // console.log(req.body)
        //close the database
        client.close();

        res.json({
            message : "task created"
        })

    }
    catch{
        console.log(error)
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

app.put("/update-mentor/:id",async function(req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("class_app")
        //select  the collection and perform action => find the particular ID and update it
        let data =await db.collection("mentor").findOneAndUpdate({_id : mongodb.ObjectId(req.params.id)},{$set : req.body})
        //close the database
        client.close();

        res.json({
            message : "task updated"
        })

    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }
    
})

app.delete("/delete-mentor/:id", async function (req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("class_app")
        //select  the collection and perform action => find the particular ID and delete it
        let data =await db.collection("mentor").deleteOne({_id : mongodb.ObjectId(req.params.id)});
        //close the database
        client.close();

        res.json({
            message : "Task deleted"
        })
    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }

})
//////////////////////////////////////////////////Students/////////////////////////////////////

app.get("/students",async function (req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("class_app")
        //select  the collection and perform action
        let data =await db.collection("student").find({userid : req.userid},{"_id" : 1}).toArray()
        //close the database
        client.close();

        res.json(data)
    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

app.get("/students/:id",async function (req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("class_app")
        //select  the collection and perform action => find the particular ID and populate it
        let data =await db.collection("student").findOne({_id : mongodb.ObjectId(req.params.id)});
        // console.log(data)
        //close the database
        client.close();

        res.json(data)
    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

app.post("/create-student",async function(req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("class_app")
        //select  the collection and perform action
        req.body.userid=req.userid;
        let data =await db.collection("student").insertOne(req.body)
        //close the database
        client.close();

        res.json({
            message : "task created"
        })

    }
    catch{
        console.log(error)
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

app.put("/update-student/:id",async function(req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("class_app")
        //select  the collection and perform action => find the particular ID and update it
        let data =await db.collection("student").findOneAndUpdate({_id : mongodb.ObjectId(req.params.id)},{$set : req.body})
        
        //close the database
        client.close();

        res.json({
            message : "task updated"
        })

    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }
    
})

app.put("/assign-mentor/:id",async function(req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("class_app")
        //select  the collection and perform action => find the particular ID and update it
        // let data1 =await db.collection("mentor").findOne({_id : mongodb.ObjectId(req.params.id)},{"_id":1, "mentorName": 1});
        let data1 =await db.collection("mentor").insertOne(req.body);
        let data =await db.collection("student").findOneAndUpdate({_id : mongodb.ObjectId(req.params.id)},{$set : {mentorsName:(req.body.mentorName)}})
        // let data =await db.collection("student").findOneAndUpdate({_id : mongodb.ObjectId(req.params.id)},{$push : {mentorsName:[(req.body)]}})
        //close the database
        client.close();

        res.json({
            message : "task updated"
        })

    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }
    
})

app.get("/students-mentor",async function (req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("class_app")
        //select  the collection and perform action
        let data =await db.collection("student").find({mentorsName:{$exists:true}}).toArray()
        //close the database
        client.close();

        res.json(data)
    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

app.delete("/delete-student/:id", async function (req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("class_app")
        //select  the collection and perform action => find the particular ID and delete it
        let data =await db.collection("student").deleteOne({_id : mongodb.ObjectId(req.params.id)});
        //close the database
        client.close();

        res.json({
            message : "Task deleted"
        })
    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }

})

app.listen(PORT,function(){
    console.log(`The app is listening in port ${PORT}`)
})