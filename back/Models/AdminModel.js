const mongoose = require('mongoose');

const Admin = new mongoose.Schema(

    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        photo:{type:String,required:false},
        phone:{type:String,required:true}


    },
    { collection:'admins' }
)

const modele = mongoose.model('admins',Admin)

module.exports = modele

