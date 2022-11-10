const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Admin = require('../Models/AdminModel')
var ObjectId = require('mongodb').ObjectID;

const transporter = require('../Models/EmailModel').transporter
const getPasswordResetURL = require('../Models/EmailModel').getPasswordResetURL
const resetPasswordTemplate = require('../Models/EmailModel').resetPasswordTemplate

function usePasswordHashToMakeToken ( password,id) 
{
  const now = new Date();
  const secret = password + "-" + id
  const token = jwt.sign(
    {
      id: id,
      expiresIn: 3600 ,
      dateToken : now.getTime(),
    },
    secret
  ) 
  return token
}

exports.sendPasswordResetEmail =  async (req, res) => {
  const { email } = req.params
  let user
  try {
    user = await Admin.findOne({ email }).exec()
 
    const token = usePasswordHashToMakeToken(user.password,user._id)
   
    const url = getPasswordResetURL(user, token)
    const emailTemplate = resetPasswordTemplate(user, url)
  
    const sendEmail = () => {
      transporter.sendMail(emailTemplate, (err, info) => {
        if (err) {
          console.log(err)
          res.json("false")
        }
        else{
          res.json("true")
        }
      })
    }
    sendEmail()

  } catch (err) {
    res.json("no user")
  }
 
}

exports.receiveNewPassword = async (req, res) => {
    const { id, token } = req.params
    let passwordHash= await bcrypt.hash(req.body.password,10);

    let user
    try {
      user = await Admin.findById({_id: ObjectId(id)})
      console.log(user)
      const secret = user.password + "-" + user._id
      
      const payload = jwt.decode(token, secret)
      
      if (payload.id === user.id) { 
            Admin.updateOne({_id: ObjectId(id)}, { password: passwordHash })
              .then(() => res.status(202).json("true"))
              .catch(err => res.status(500).json(err))
       
      }
    }
    catch (err) {
      res.status(500).json(err)
    }
  
}
