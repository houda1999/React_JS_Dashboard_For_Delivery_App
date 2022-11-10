const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const PlatSchema=Schema({
   name:{type:String,required:true},
   price:{type:Number,required:true},
   photo:{type:String,required:true},
   extra:{type:String,required:true},
   categorie:{type: Schema.ObjectId,ref:'Categorie'},
   restaurant:{type: Schema.ObjectId,ref:'Restaurant'},
   

 
});

const Plat=mongoose.model('Plat',PlatSchema);
module.exports=Plat;