const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const { connectDB, getDB } = require('./config');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();

connectDB();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))); // Stel een statische bestandsserver in om bestanden uit de 'public/uploads' map toegankelijk te maken onder de '/uploads' URL

const storage = multer.diskStorage({
  destination: function (req, file, cb) { // Definieer bestemming
    cb(null, 'public/uploads/'); // Sla de bestanden op in de 'public/uploads' map
  },
  filename: function (req, file, cb) { // Definieer hoe de bestandsnamen opgeslagen worden
    cb(null, Date.now() + '-' + file.originalname); // Gebruik de huidige datum en tijd
  }
});

const upload = multer({ storage: storage });

app.use(session({
  secret: process.env.SESSION_SECRET || 'jouwsecret', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' } 
}));

function ensureAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  } else {
    res.redirect('/login');
  }
}

app.get('/overzicht', ensureAuthenticated, async (req, res) => {
  try {
    const db = getDB();
    const trainers = await db.collection('trainers').find().toArray();
    res.render('overzicht', { trainers });
  } catch (err) {
    console.error('Error occurred while fetching trainers:', err);
    res.redirect('/');
  }
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', upload.single('profileImage'), async (req, res) => { // Deze route behandelt POST-verzoeken naar '/register' en verwerkt een enkele bestand upload met 'profileImage' als veldnaam
  const { name, username, email, password, birthdate, gender } = req.body; // Haal de naam, gebruikersnaam, email, wachtwoord, geboortedatum en geslacht uit de body
  const profileImage = req.file ? `/uploads/${req.file.filename}` : ''; // Als er een profielafbeelding is geüpload, sla het pad op
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash het wachtwoord met bcrypt
    const newUser = { name, username, email, password: hashedPassword, birthdate, gender, profileImage }; // Hoe het in de db zal komen
    const db = getDB(); 
    const result = await db.collection('users').insertOne(newUser);
    req.session.userId = result.insertedId; // Sla de gebruikers-ID op in de sessie
    req.session.username = newUser.username; // Sla de gebruikersnaam op in de sessie
    res.redirect('/');
  } catch (err) { 
    console.error('Error occurred while creating the user:', err);
    res.redirect('/register');
  }
});

app.get('/login', (req, res) => {
  const loginError = req.session.loginError;
  req.session.loginError = null;
  res.render('login', { loginError });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body; // Haal de username en password op uit de body van het verzoek
  try {
    const db = getDB();
    const user = await db.collection('users').findOne({ username }); // Zoek de gebruiker in de 'users' collectie met de username
    if (user && await bcrypt.compare(password, user.password)) { // Als de gebruiker bestaat en het wachtwoord klopt
      req.session.userId = user._id; // Sla de userId op in de sessie
      req.session.username = user.username;
      req.session.role = user.role; // Sla de rol van de gebruiker op in de sessie
      req.session.loginError = null; // Zet de loginError in de sessie op null
      res.redirect('/');
    } else {
      req.session.loginError = 'Login failed, please try again.';
      res.redirect('/login');
    }
  } catch (err) {
    console.error('Error occurred while logging in:', err);
    req.session.loginError = 'Login failed, please try again.';
    res.redirect('/login');
  }
});

// Delete session
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error occurred while logging out:', err);
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

// Home
app.get('/', (req, res) => {
  res.render('index');
});

// Trendingworkouts
app.get('/trendingworkouts', (req, res) => {
  res.render('trendingworkouts');
});

// Profiel bekijken en bewerken
app.get('/mijnprofiel', ensureAuthenticated, async (req, res) => {
  try {
    const db = getDB();
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.session.userId) });
    if (!user) {
      console.error('User not found');
      return res.redirect('/');
    }
    res.render('profiel', { user });
  } catch (err) {
    console.error('Error occurred while fetching the profile:', err);
    res.redirect('/');
  }
});

// Mijn profiel route
app.post('/mijnprofiel', ensureAuthenticated, upload.single('profileImage'), async (req, res) => {
  const { name, username, email, password } = req.body;
  const profileImage = req.file ? `/uploads/${req.file.filename}` : req.body.existingProfileImage;
  try {
    const db = getDB();
    const updateFields = { name, username, email, profileImage };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    await db.collection('users').updateOne({ _id: new ObjectId(req.session.userId) }, { $set: updateFields });
    res.redirect('/mijnprofiel');
  } catch (err) {
    console.error('Error occurred while updating the profile:', err);
    res.redirect('/mijnprofiel');
  }
});

// Over ons
app.get('/overons', (req, res) => {
  res.render('overons');
});

// Error route
app.get('/error', (req, res) => {
  res.render('error');
});

// Detailpagina voor een specifieke trainer
app.get('/trainer/:id', ensureAuthenticated, async (req, res) => {
  try { // Probeer dit stuk code, en als er iets misgaat, vang de fout op
    const db = getDB();
    const trainer = await db.collection('trainers').findOne({ _id: new ObjectId(req.params.id) }); // Zoek de trainer in de 'trainers' collectie met het id uit de URL
    if (!trainer) {
      return res.status(404).send('Trainer niet gevonden'); // Stuur een 404 error en zeg 'Trainer niet gevonden'
    }
    res.render('detailpagina', { trainer }); // geef de trainerdata mee aan de pagina
  } catch (err) {
    console.error('Er is een fout opgetreden bij het ophalen van de trainerdetails:', err);
    res.redirect('/overzicht');
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
