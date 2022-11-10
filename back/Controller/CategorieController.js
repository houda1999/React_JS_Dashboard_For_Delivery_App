const Categorie = require('../Models/CategorieModel');
var ObjectId = require('mongodb').ObjectID;

exports.getAllCategorie = async (req, res) => {

    await Categorie.find()
    .then(list =>res.status(202).json({ status: true, dataCategories : list }) )
    .catch(err => res.status(500).json({ status: false }))
}