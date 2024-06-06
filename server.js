// server.js
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
app.use('/uploads', express.static('public/uploads')); // Serve the 'uploads' folder statically

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Session management
app.use(session({
  secret: 'jouw-geheim', // Replace 'jouw-geheim' with a random long string
  resave: false,
  saveUninitialized: true,
}));

// Middleware to ensure authentication
function ensureAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  } else {
    res.redirect('/login');
  }
}

// Routes

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
    console.error('Error occurred while creating the user:', err);
    res.redirect('/register');
  }
});

// Login Route
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

// Logout Route
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
  const profileImage = req.file ? 'uploads/' + req.file.filename : req.body.existingProfileImage;
  try {
    const db = getDB();
    const updateFields = { name, username, email, profileImage };

    // Update password only if a new password is provided
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

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port', process.env.PORT || 3000);
});
