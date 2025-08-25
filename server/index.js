//Setting server side firstly
//5 steps  1(import),2(instance),3(define port),4(define route and send default response),5(start server and listen for reqs),6(set new routes)

const express=require('express'); //we'll import the server
const app=express();    //our server instance
const mongoose=require('mongoose');//import mongoose e.g. translator for monogDB
const mongo_url='mongodb://localhost:27017/cadet-tracker';

app.use(express.json());//middleware to handle json data

const PORT=process.env.PORT || 3000; //declaring constant variable named PORT and process.env is an object that holds users envlironment variables
                                    //Env variables--what it runs on--The program will automatically use that value.
                                   // we then or that so if no env variables we set default port
////Route for url
// app.get is receptionist 
// app variable represents the entire app
// get(path,handler) 
app.get('/',(req,res)=>{ //here the handler says  a route handler's job is to take the information it finds in the req object and use it to craft an appropriate reply with the res object.
    res.send(`welcome to cadetTracker Backend`);
});

//route for login
app.post('/login',(req,res)=>{
     //get data from frontend
     const {regimentalNo,password}=req.body; // in future we'll verify to Db
    console.log('login attempt:', {regimentalNo,password});
    res.status(200).json({message: `login request recived.`});
});

//route for registration
app.post('/register',()=>{
    //get cadet data
    const cadetData= req.body;
    //print data in console
    console.log('Reistration Succesful.', {cadetData});
    res.status(201).json({message: `Registration rcvd`});//future we'll verify via email
});

mongoose.connect(mongo_url)
    .then(()=>{
        console.log('Db Connection succesful');

         //Start the server and make it listen for incoming requests.    (port and handler)
         app.listen(PORT,()=>{
                       console.log(`server is running on http://localhost:${PORT}`);//use backticks not single quotes
          });

    })
    .catch(err => {
        console.log('Connection failed',err);
    });

