// server.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const { connectDB, getDB } = require('./config');
require('dotenv').config();

const app = express();

connectDB();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('public/uploads')); // Serveer de map 'uploads' statisch voor het opslaan van uploads

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Sessiebeheer
app.use(session({
  secret: 'jouw-geheim', // Vervang 'jouw-geheim' door een willekeurige lange string
  resave: false,
  saveUninitialized: true,
}));

// Middleware om authenticatie te verzekeren
function ensureAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  } else {
    res.redirect('/login');
  }
}


// apps

app.get('/overzicht', (req, res) => {
  res.render('overzicht');
});

// Signup Route
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', upload.single('profileImage'), async (req, res) => {
  const { name, username, email, password, birthdate, gender } = req.body;
  const profileImage = req.file ? req.file.path : '';
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, username, email, password: hashedPassword, birthdate, gender, profileImage };
    const db = getDB();
    await db.collection('users').insertOne(newUser);
    req.session.userId = newUser._id;
    req.session.username = newUser.username;
    req.session.role = newUser.role;
    res.redirect('/');
  } catch (err) {
    console.error('Er is een fout opgetreden bij het aanmaken van de gebruiker:', err);
    res.redirect('/register');
  }
});

// Login Route
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const db = getDB();
    const user = await db.collection('users').findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user._id;
      req.session.username = user.username;
      req.session.role = user.role;
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    console.error('Er is een fout opgetreden bij het inloggen:', err);
    res.redirect('/login');
  }
});

// Logout Route
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Er is een fout opgetreden bij het uitloggen:', err);
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

// Home Route
app.get('/', ensureAuthenticated, (req, res) => {
  res.render('index', { 
    username: req.session.username,
    role: req.session.role,
  });
});

// Trainers Route
app.get('/trainers', ensureAuthenticated, async (req, res) => {
  try {
    const db = getDB();
    const trainers = await db.collection('users').find({ role: 'trainer' }).toArray();
    res.render('trainers', { trainers });
  } catch (err) {
    console.error('Er is een fout opgetreden bij het ophalen van de personal trainers:', err);
    res.redirect('/');
  }
});

// Detailpagina
app.get('/detailpagina', (req, res) => {
  res.render('detailpagina');
});

// Trendingworkouts
app.get('/trendingworkouts', (req, res) => {
  res.render('trendingworkouts');
});

// Profiel
app.get('/mijnprofiel', (req, res) => {
  res.render('profiel');
});

// Over ons
app.get('/overons', (req, res) => {
  res.render('overons');
});


app.listen(process.env.PORT, () => {
  console.log('De server draait op poort 3000');
});
