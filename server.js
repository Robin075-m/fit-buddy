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
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))); // Serve the 'uploads' folder statically

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret', // Use an environment variable for the session secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' } // Use secure cookies in production
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

app.post('/register', upload.single('profileImage'), async (req, res) => {
  const { name, username, email, password, birthdate, gender } = req.body;
  const profileImage = req.file ? `/uploads/${req.file.filename}` : ''; // Corrected path for the profile image
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, username, email, password: hashedPassword, birthdate, gender, profileImage };
    const db = getDB();
    const result = await db.collection('users').insertOne(newUser);
    req.session.userId = result.insertedId;
    req.session.username = newUser.username;
    res.redirect('/');
  } catch (err) {
    console.error('Error occurred while creating the user:', err);
    res.redirect('/register');
  }
});

app.get('/login', (req, res) => {
  const loginError = req.session.loginError;
  req.session.loginError = null;  // Clear the login error
  res.render('login', { loginError });
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
      req.session.loginError = null;  // Clear any previous login errors
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

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/trainers', ensureAuthenticated, async (req, res) => {
  try {
    const db = getDB();
    const trainers = await db.collection('users').find({ role: 'trainer' }).toArray();
    res.render('trainers', { trainers });
  } catch (err) {
    console.error('Error occurred while fetching personal trainers:', err);
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

// Over ons
app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/test', (req, res) => {
  res.render('newhomepage');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
