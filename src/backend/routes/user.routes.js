const express = require('express')
const router = express.Router()
const User = require('../models/User')
const mongoose = require('mongoose')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const DIR = './public/'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR)
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-')
    cb(null, uuidv4() + '-' + fileName)
  }
})

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  }
})

router.post('/user-profile', upload.single('profileImg'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  console.log(req.body.name)
  console.log(req.file.filename)
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    profileImg: url + '/public/' + req.file.filename
  })
  user.save().then(result => {
    console.log({ 'message': 'User registered successfully!' })
    res.status(201).json({
      userCreated: {
        _id: result._id,
        profileImg: result.profileImg
      }
    })
  }).catch(err => {
    console.log(err), res.status(500).json({ error: err })
  })
})

router.get('/', (req, res, next) => {
  User.find().then(data => {
    console.log({ 'message': 'User list retrieved successfully!' })
    res.status(200).json({ users: data })
  })
})

module.exports = router