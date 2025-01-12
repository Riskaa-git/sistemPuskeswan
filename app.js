
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const profilRoutes = require('./routes/profilRoutes');
const { sequelize } = require('./models');
const { createSuperAdmin } = require('./controllers/adminController');


dotenv.config();
const app = express();
// cors


// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', consultationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', profilRoutes);

// Serve the homepage
app.get('/', (req, res) => {
  res.render('index');
});
 app.get('/login', (req, res) => {
   res.render('login');
 });
 app.get('/register', (req, res) => {
   res.render('register');
 });
 app.get('/userDashboard', (req, res) => {
  res.render('userDashboard');
 });
 app.get('/dashboard', (req, res) => {
  res.render('dashboard');
 });
 app.get('/loginAdmin', (req, res) =>{
   res.render('loginAdmin');
 });
 app.get('/consultation-detail/:id', (req, res) => {
  res.render('consultation-detail');
});
app.get('/manageAdmin', (req, res) => {
  res.render('manageAdmin')
});
app.get('/addAdmin', (req, res) => {
  res.render('addAdmin')
});
app.get('/profil', (req, res) => {
  res.render('profil')
});
app.get('/home', (req, res) => {
  res.render('home')  // Pass the user object
});
app.get('/manageConsultation', (req, res) => {
  res.render('manageConsultation')
});
app.get('/search', (req, res) => {
  res.render('search')
});
app.get('/userConsultation', (req, res) => {
  res.render('userConsultation')
});
app.get('/history', (req, res) => {
  res.render('history')
});
app.get('/admin/consultation-detail-admin/:id', (req, res) => {
    res.render('admin/consultation-detail-admin')
});

// app.get('/userConsultation', (req, res) => {
//   res.render('userConsultation');
// });
// app.get('/searchConsultations', (req, res) => {
//   res.render('searchConsultations');
// });

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});



// // Buat akun superadmin jika belum ada
//  sequelize.sync().then(async () => {
//   await createSuperAdmin();
// });

module.exports = app;
