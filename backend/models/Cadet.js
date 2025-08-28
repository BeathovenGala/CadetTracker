//2nd thing module we created
//steps 1(import),2(schema),3(create and export)
//import mongoose
const mongoose = require('mongoose');
const bcrypt =require('bcryptjs');
//Define the schema for our Cadet data
// A schema defines the structure, data types, and validation rules for our documents.
const CadetSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true, //removes whitespace
    },
    regimentalNo:{
        type:Number,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    unit: {
        type: String,
        required: true,
        trim: true,
    },
    college: {
        type: String,
        required: true,
        trim: true,
    },
    // division: {
    //     type: String,
    //     required: true,
    //     trim: true,
    // },
     gender: {
        type: String,
        required: true,
        enum: ['SD', 'SW'], // This ensures only 'SD' or 'SW' are valid values
    },
    year: {
        type: String,
        required: true,
        trim: true,
    },
    enrollmentYear: {
        type: Number,
        required: true,
    },

});

//we will save the password directly into hash before saving to db   i.e pre save
CadetSchema.pre('save',async function(next) { // We use a pre-save hook to ensure the password is always hashed.
   //it is a gaurd clause so we don't need if else it imediately moves to the next if  condition is met
    // Only hash the password if it has been modified(aka inserted) ,,,or if new or else hook won't be called
    if(!this.isModified('password')){//this hook says is password is NOT modified then move on to next step
     return next();
    }    
    //if it is modified(aka new inserted)
    try {
         // Generate a salt. A salt is a random string added to the password
        // to make the hash unique, even for the same password.
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    } catch (err) {
        next(err);//send s error to the try catch of
        
    }
});




//mongoose.model('name_of_model','schema')
const Cadet=mongoose.model('Cadet',CadetSchema);// 3. Create and export the Mongoose model
// This model provides us with functions to interact with the database (e.g., save(), find()).

module.exports =Cadet; //it like a library. The Cadet class is a book in that library. module.exports = Cadet; puts that book on the main shelf, so anyone who comes into the library can check it out.


