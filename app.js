const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// User schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    cart: Array,
    orders: Array
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password, cart: [], orders: [] });
    newUser.save((err) => {
        if (err) {
            res.send('Error registering user.');
        } else {
            res.redirect('/login');
        }
    });
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username, password }, (err, user) => {
        if (user) {
            req.session.user = user;
            res.redirect('/');
        } else {
            res.send('Invalid login.');
        }
    });
});

app.get('/cart', (req, res) => {
    if (req.session.user) {
        res.sendFile(__dirname + '/views/cart.html');
    } else {
        res.redirect('/login');
    }
});

app.get('/orders', (req, res) => {
    if (req.session.user) {
        res.sendFile(__dirname + '/views/orders.html');
    } else {
        res.redirect('/login');
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
