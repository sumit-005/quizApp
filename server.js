
const http = require("http");
const express =  require("express");
const mongoose =  require("mongoose");
const bodyParser =  require("body-parser");
const postSchema = require("./portal.model");

const port = 5000;


const app = express();

mongoose.connect('mongodb+srv://sumit-005:Mtj7m6pZVyHK8OpR@cluster0-w7rcj.mongodb.net/quizApp?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
  console.log("Connected to Database...");

})
.catch(()=>{
  console.log("connection Fail...");

})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req,res,next) =>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,token");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials",'true');
    next();
});


app.get('', (req,res,next)=>{


  postSchema.find().then((documents) =>{
    console.log(documents);

    res.json({
      status: documents[0].status,
      message: documents[0].message,
      tests: documents[0].tests

    });


  });

});

app.set("port", port);


app.listen(5000);
console.log("Running...");

