const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CommandeSchema=Schema({
   date_commande:{type:Date,required:true},
   status:{type:String,required:true,default:"waiting"},
   client:{type: Schema.ObjectId,ref:'Client'},
   livreur:{type: Schema.ObjectId,ref:'Livreur'},
});

const Commande=mongoose.model('Commande',CommandeSchema);
module.exports=Commande;