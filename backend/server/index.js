//Setting server side firstly
//5 steps  1(import),2(instance),3(define port),4(define route and send default response),5(start server and listen for reqs),6(set new routes)
// Loading env vars
const dotenv = require('dotenv'); // Import dotenv
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });///telling the program exactly where to look for the .env file
console.log('Resolved .env path:', path.resolve(__dirname, '..', '.env'));
console.log('MONGO_URI from environment:', process.env.MONGO_URI);

const express=require('express'); //we'll import the server
const mongoose=require('mongoose');//import mongoose e.g. translator for monogDB
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const generateToken = require('../Utils/generateToken');
const { protect, adminProtect } = require('../utils/authMiddleware.js'); 
const cors = require('cors');



// Importing the routes
const adminRoutes = require('../routes/admin/adminRoutes');
const cadetRoutes = require('../routes/cadet/attendanceRoutes');
// Create the express application
const app = express();
app.use(express.json()); //middleware to handle json data
app.use(cors()); // to enable CORS

// Importing our Cadet and Admin models
const Cadet = require('../models/Cadet');
const Admin = require('../models/Admin');

// Connecting to mongodb
const MONGO_URI = process.env.MONGO_URI;
//Connecting to JWT
const JWT_SECRET = process.env.JWT_SECRET;

const PORT=process.env.PORT || 3000; //declaring constant variable named PORT and process.env is an object that holds users envlironment variables
                                    //Env variables--what it runs on--The program will automatically use that value.
                                   // we then or that so if no env variables we set default port


//to ensure Database connection
mongoose.connect(MONGO_URI)
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

    // Use the new admin routes module
app.use('/api/admin', adminRoutes);//any request starting with /api/admin should be handled by the code inside the adminRoutes file
app.use('/api/cadet', cadetRoutes);

////Route for url
// app.get is receptionist 
// app variable represents the entire app
// get(path,handler) 

app.get('/',(req,res)=>{ //here the handler says  a route handler's job is to take the information it finds in the req object and use it to craft an appropriate reply with the res object.
    res.send(`welcome to cadetTracker Backend`);
});

//route for login
//now generate jwt upon succesful login
app.post('/login',async(req,res)=>{
     //get data from frontend
    try {
        const {regimentalNo,password}=req.body; // in future we'll verify to Db
     //    console.log('login attempt:', {regimentalNo,password});
     //    res.status(200).json({message: `login request recived.`});
        const cadet= await Cadet.findOne({regimentalNo}); // Use the Mongoose 'findOne' method to search for a cadet by their regimental number.    

        if(!cadet){
            return res.status(404).json({message: 'Cadet not found'});
        }     
         //password check
         const isMatch = await bcrypt.compare(password,cadet.password);
         
             if(!isMatch){   // If the passwords don't match, send an unauthorized response and exit.
                return res.status(401).json({message: 'Incorrect password'});
               }
                const token = jwt.sign({ id: cadet._id }, JWT_SECRET, { expiresIn: '1h' });
              // If the cadet is found and the password is correct, send a success message.
                   return res.status(200).json({ message: 'Login successful!', token });//send token back to clinet
        }
     catch (err) {
        //to handle errors that occur while looking for data within the server
        console.error('Login error',err);
        res.status(500).json({message: 'Internal server error'})

     } 
});

//route for registration
app.post('/register',async(req,res)=>{
    //print data in console
    // console.log('Reistration Succesful.', {cadetData});
    try {
        //get cadet data
        console.log("Backend data received:", req.body);
        const cadetData= req.body;
        const newCadet= new Cadet(cadetData); // Create a new instance of our Cadet model. The pre-save hook in the model
        // will automatically hash the password before saving.
        await newCadet.save();
        console.log('New cadet is registered');  
        const token = generateToken(newCadet._id, 'cadet'); // Pass the role
        res.status(201).json({message: `Registration rcvd`,
                              cadet: newCadet,
        });//future we'll verify via email
        
    } catch (err) {
        // If there's an error (e.g., regimentalNo already exists), we catch it here.
        console.error('Registration error:', err);
        res.status(400).json({message: 'Registration failed', error:err.message});
        //400 for bad request
    }
});

app.post('/admin/login',async(req,res)=>{
    try {
        //1(we'll take user pass),2(does admin already exist),3(if found check password),4(login enter )
        const {username,password}= req.body;
         const admin = await Admin.findOne({ username }); //2
         //if not saved in hash table
         if (!admin) return res.status(404).json({ message: 'Admin not found.' });

         const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Incorrect password.' });
        const token = generateToken(admin._id, 'admin'); // Pass the role

        res.status(200).json({ message: 'Admin login successful!', token });
        
        
    } catch (err) {
        console.error('Admin login error:',err);
        res.status(500).json({message: 'Internal server error'});
        
    }
});



//Protected routes
app.get('/cadet/dashboard', protect, (req, res) => {
    // If we reach this code, it means the token was valid
    // The cadet's ID is available on req.user from the middleware
    res.status(200).json({ message: 'Welcome to the dashboard!', 
        userId: req.user, 
        role: req.user.role
    }); // We'll use this ID to fetch the cadet's data from the database later
});


