const Client = require('../Models/ClientModel');

exports.getAllClients = async (req, res) => {

    const data = await Client.find();
    if (data != null)
        res.status(202).json({ status: true, dataClients: data });
    else
        res.status(500).json({ status: false });
}
exports.deleteClient = async (req, res) => {
    var query = { email: req.body.email };
    Client.deleteOne(query, function (err, obj) {
        if (err) res.json({ deleted: false,error: err});
        res.json({ deleted: true });
    });
}

exports.getNumberOf = async (req, res) => {
    Client.countDocuments(function(err, c) {
        if (err) res.json({ error: err});
        else res.json({ count: c });
   });
}
