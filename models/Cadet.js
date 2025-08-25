//2nd thing module we created
//steps 1(import),2(schema),3(create and export)
//import mongoose
const mongoose = require('mongoose');

//Define the schema for our Cadet data
// A schema defines the structure, data types, and validation rules for our documents.
const CadetSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true, //removes whitespace
    },
    regimentalNo:{
        type:String,
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
    division: {
        type: String,
        required: true,
        trim: true,
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

const Cadet=mongoose.model(`Cadet`,`CadetSchema`);// 3. Create and export the Mongoose model
// This model provides us with functions to interact with the database (e.g., save(), find()).

module.exports =Cadet; //it like a library. The Cadet class is a book in that library. module.exports = Cadet; puts that book on the main shelf, so anyone who comes into the library can check it out.


