const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const dotenv = require('dotenv').config()
const collection = require("./config")

// env
const port = process.env.PORT

// omzetten naar json
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

// index
app.get("/", (req, res) =>  {
    res.render('index.ejs' , {name: 'Robin'})
})

// login
app.get("/login", (req, res) =>  {
    res.render('login.ejs')
})

app.post("/login", (req, res) =>  {

})

//register
app.get("/register", (req, res) =>  {
    res.render('register.ejs')
})

app.post("/register", async (req, res) => {

  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    birthdate: req.body.birthdate
  }

  const userdata = await collection.insertMany(data);

  if (express.response.ok) {
    console.log(userdata);
  } else {
    console.error();
  }

})

app.listen(port)