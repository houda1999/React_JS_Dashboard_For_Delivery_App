const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ClientSchema=Schema({
   name:{type:String,required:true},
   email:{type:String,required:true,unique:true},
   password:{type:String,required:true},
   activated:{type:Boolean,default:false}
   
});

const Client=mongoose.model('Client',ClientSchema);
module.exports=Client;