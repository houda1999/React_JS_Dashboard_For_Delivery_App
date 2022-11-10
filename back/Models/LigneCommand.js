const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Ligne_CommandeSchema=Schema({
   restaurant:{type: Schema.ObjectId,ref:'Restaurant'},
   plat:{type: Schema.ObjectId,ref:'Plat'},
   commande:{type:Schema.ObjectId,ref:"Commande"},
   subTotal:{type:Number,required:true},
   quantite:{type:Number,required:true},
   isReady:{type:Boolean,default:false}   
   
 
});

const Ligne_Commande=mongoose.model('Ligne_Commande',Ligne_CommandeSchema);
module.exports=Ligne_Commande;