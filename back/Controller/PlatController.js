const Plat = require('../Models/PlatModel');
var ObjectId = require('mongodb').ObjectID;


exports.getAllPlats = async (req, res) => {

    await Plat.find({ 'restaurant': req.query["restaurant"] })
    .populate("restaurant","name")
    .populate("categorie","name")
    .then(list =>res.status(202).json({ status: true, dataPlats : list }) )
    .catch(err => res.status(500).json({ status: false }))
}

exports.insertNewPlat = async(req, res) =>
{
    
    const plat = new Plat({
        name: req.body.name1,
        price: req.body.price1,
        photo: req.body.photo1,
        categorie: ObjectId(req.body.selectedCat),
        restaurant : ObjectId(req.body.idRes),
        extra:" "
    })
    plat.save(function (err, doc) {
        if (err) return res.json({ added: false, error: err });
        return res.json({ added: true,addObj:plat });
    });
}

exports.deletePlat = async (req, res) => {
    var query = { _id: ObjectId(req.body.id) };
    Plat.deleteOne(query, function (err, obj) {
        if (err) res.json({ deleted: false,error: err});
        res.json({ deleted: true });
    });
}

exports.updatePlat = async (req, res) => {
    const plat = {
        id : req.body.idPlat,
        name: req.body.name1,
        price: req.body.price1,
        photo: req.body.photo1,
        categorie: ObjectId(req.body.selectedCat),
        restaurant : ObjectId(req.body.id),
        extra:" "
    }
    Plat.findOneAndUpdate({ _id: ObjectId(req.body.idPlat) }, 
    plat)
        .then(() => res.json({ updated: true,obj:plat }))
        .catch(err => res.json({ updated: false, error: err }));
}