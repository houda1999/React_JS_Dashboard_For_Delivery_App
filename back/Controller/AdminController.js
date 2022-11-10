const Admin = require('../Models/AdminModel');
var ObjectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.loginAdmin = async (req, res) => {

    const admin = await Admin.findOne({
		email: req.body.email,
	})

	if (!admin) {
		return res.json({ status: 'error', error: 'Invalid login' })
	}
   
	const isPasswordValid = await bcrypt.compare(req.body.password,admin.password)
   
	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: admin.name,
				email: admin.email,
			},
			'webToken'
		) 

		return res.json({ status: true, token: token ,admin:admin})
	} else {
		return res.json({ status: false , token : false })
	}
}

exports.updateAdmin = async (req, res) => {

  
    const admin = {
		
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
        phone : req.body.phone,
    }
    
    Admin.findOneAndUpdate({ _id: ObjectId(req.body.id) }, 
     admin)
        .then(() => res.json({ updated: true,obj:admin }))
        .catch(err => res.json({ updated: false, error: err }));
}


