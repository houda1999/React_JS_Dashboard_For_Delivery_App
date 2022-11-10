const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const LivreurSchema=Schema({
   name:{type:String,required:true},
   username:{type:String,required:true,unique:true},
   password:{type:String,required:true},
   cin:{type:String,required:true,unique: true}
 
});


const Livreur=mongoose.model('Livreur',LivreurSchema);
module.exports=Livreur;