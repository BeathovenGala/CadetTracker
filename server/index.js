//Setting server side firstly
//5 steps  1(import),2(instance),3(define port),4(define route and send default response),5(start server and listen for reqs)

const express=require('express'); //we'll import the server
const app=express();    //our server instance

const PORT=process.env.PORT || 3000; //declaring constant variable named PORT and process.env is an object that holds users envlironment variables
                                    //Env variables--what it runs on--The program will automatically use that value.
                                   // we then or that so if no env variables we set default port

//app.get is receptionist 
//app variable represents the entire app
//get(path,handler) 
app.get('/',(req,res)=>{ //here the handler says  a route handler's job is to take the information it finds in the req object and use it to craft an appropriate reply with the res object.
    res.send(`welcome to cadetTracker Backend`);
});

//Start the server and make it listen for incoming requests.    (port and handler)
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);//use backticks not single quotes
});