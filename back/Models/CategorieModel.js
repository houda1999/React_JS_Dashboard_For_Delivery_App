const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CategorieSchema=Schema({
   name:{type:String,required:true}
   
});

const Categorie=mongoose.model('Categorie',CategorieSchema);
module.exports=Categorie;