const Restaurant = require('../Models/RestaurantModel');
var ObjectId = require('mongodb').ObjectID;


exports.getAllRestaurants = async (req, res) => {

    const data = await Restaurant.find();
    if (data != null)
        res.status(202).json({ status: true, dataRestaurants : data });
    else
        res.status(500).json({ status: false });
}

exports.insertNewRestaurant = async (req, res) => {

    const restaurant = new Restaurant({
        name: req.body.nom1,
        adresse: req.body.adresse1,
        tele: req.body.phone1,
        photo: req.body.photo1,
        city: req.body.city1,

    })
    restaurant.save(function (err, doc) {
        if (err) return res.json({ added: false, error: err });
        return res.json({ added: true ,addObj:restaurant});
    });


};

exports.deleteRestaurant = async (req, res) => {
    var query = { _id: ObjectId(req.body.id) };
    Restaurant.deleteOne(query, function (err, obj) {
        if (err) res.json({ deleted: false,error: err});
        res.json({ deleted: true });
    });
}

exports.updateRestaurant = async (req, res) => {
    const restaurant = {
        id : req.body.id,
        name: req.body.nom1,
        adresse: req.body.adresse1,
        tele: req.body.tele1,
        photo : req.body.photo1,
        city : req.body.city1
    }
    Restaurant.findOneAndUpdate({ _id: ObjectId(req.body.id) }, 
     restaurant)
        .then(() => res.json({ updated: true,obj:restaurant }))
        .catch(err => res.json({ updated: false, error: err }));
}

exports.getNumberOf = async (req, res) => {
    Restaurant.countDocuments(function(err, c) {
        if (err) res.json({ error: err});
        else res.json({ count: c });
   });
}