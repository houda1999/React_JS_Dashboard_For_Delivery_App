const Livreur = require('../Models/LivreurModel');
const bcrypt = require('bcryptjs');

exports.getAllLivreurs = async (req, res) => {

    const data = await Livreur.find();
    if (data != null)
        res.status(202).json({ status: true, dataLivreurs: data });
    else
        res.status(500).json({ status: false });
}
exports.insertNewLivreurs = async (req, res) => {

    let pass = await bcrypt.hash(req.body.password1, 15);
    const livreur = new Livreur({
        name: req.body.fullName1,
        username: req.body.userName1,
        password: pass,
        cin: req.body.cin1,
        etat: "free"
    })
    livreur.save(function (err, doc) {
        if (err) return res.json({ added: false, error: err });
        return res.json({ added: true });
    });


};
exports.updateLivreur = async (req, res) => {


    let fullname = req.body.newFullName;
    let username = req.body.newUserName;
    let cin = req.body.cin;
    Livreur.findOneAndUpdate({ 'cin': cin }, { 'name': fullname, 'username': username })
        .then(() => res.json({ updated: true }))
        .catch(err => res.json({ updated: false, error: err }));


};
exports.deleteLivreur = async (req, res) => {
    var query = { cin: req.body.cin };
    Livreur.deleteOne(query, function (err, obj) {
        if (err) res.json({ deleted: false,error: err});
        res.json({ deleted: true });
    });
}

exports.getNumberOf = async (req, res) => {
    Livreur.countDocuments(function(err, c) {
        if (err) res.json({ error: err});
        else res.json({ count: c });
   });
}