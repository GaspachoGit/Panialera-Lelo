const express = require('express')
const router = require('./router')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const passport = require('passport')
const initializePassport = require('./config/passport.config')
const handlebars = require('express-handlebars')
const vars = require('./config/config.env')

const mongoUser = vars.development.database.username
const mongoPass = vars.development.database.password
const port = vars.development.port

const app = express()
mongoose.set('strictQuery', false);
/* mongoose.connect('mongodb+srv://LeloPaniales:LeloPañalera@cluster0.yehvjpt.mongodb.net/?retryWrites=true&w=majority', (err)=>{
 */
mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPass}@cluster0.yehvjpt.mongodb.net/?retryWrites=true&w=majority`, (err)=>{
  if(err) {
    console.log(err)
  }else{
    console.log('mongoDB is connected')
  }
})
 
app.use(express.json())
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}))
app.use(session({
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.yehvjpt.mongodb.net/sessions?retryWrites=true&w=majority`,
    mongoOptions: {useNewUrlParser:true, useUnifiedTopology:true},
  }),
  secret:'123456',
  resave:false,
  saveUninitialized: false
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine("handlebars", handlebars.engine());


app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

router(app)

app.listen(port, ()=>{
  console.log(`server running at port ${port}`)
})
