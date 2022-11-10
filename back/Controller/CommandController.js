const Commande = require('../Models/CommandModel');
var ObjectId = require('mongodb').ObjectID;
const LigneCommande = require('../Models/LigneCommand');


exports.getAllCommandes = async (req, res) => {

    await Commande.find()
    .populate("livreur","name")
    .populate("client","name")
    .then(list =>res.status(202).json({ status: true, dataCommandes : list }) )
    .catch(err => res.status(500).json({ status: false }))
}

exports.deleteCommandes = async (req, res) => {
    var query = { _id: ObjectId(req.body.id) };
    Commande.deleteOne(query, function (err, obj) {
        if (err) res.json({ deleted: false,error: err});
        res.json({ deleted: true });
    });
}


