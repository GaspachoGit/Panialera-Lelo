const {Router} = require('express')
const publicAccess = require('../utils/middlewares/publicAcces')
const privateAccess = require('../utils/middlewares/privateAcces')

const router = Router()

router.get('/login', publicAccess, (req,res)=>{
  res.render('login.handlebars')
})
router.get('/signup', publicAccess, (req,res)=>{
  res.render('signup.handlebars')
})
router.get('/main',privateAccess, (req,res)=>{
  res.render('api.handlebars')
})


module.exports = router