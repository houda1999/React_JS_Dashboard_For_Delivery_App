const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const RestaurantSchema=Schema({
   name:{type:String,required:true},
   adresse:{type:String,required:true},
   tele:{type:String,required:true},
   photo:{type:String,required:true},
   city:{type:String,required:true}
 
});

const Restaurant=mongoose.model('Restaurant',RestaurantSchema);
module.exports=Restaurant;