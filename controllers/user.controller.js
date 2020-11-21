const User = require("../models/user.model")

const find = (req, res)=>{
    var value = req.body
    User.find(value,(err, user) => {
        return res.status(200).json(user)
    })
    
}
const create = (req,res)=>{
    User.create(req.body);
    return res.status(200).json({
        messsage: "Create ok"
    })
}

module.exports = {
    find,
    create
}