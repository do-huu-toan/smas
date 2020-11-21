const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user.controller')

router.route('/find')
    .get(UserController.find)
router.route('/create')
    .post(UserController.create)
module.exports = router