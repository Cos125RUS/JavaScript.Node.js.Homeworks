const express = require('express');
const path = require('path');

const count = require('./count');
const pages = require('./pages');

require('dotenv').config();

const port = process.env.PORT || 8080;

const countPath = path.join(__dirname, process.env.COUNT);
const counter = count.load(countPath);

const app = express();

app.set('view engine', 'pug');
app.use(express.static('static'));

app.use((req, res, next) => {
    counter[req.url]++;
    count.write(countPath, counter);
    next();
});

app.get('/', (req, res) => {
    res.render('page', { ...pages.home, count: counter['/'] });
});

app.get('/about', (req, res) => {
    res.render('page', { ...pages.about, count: counter['/about'] });
});

app.listen(port, () => console.log(`Started on port ${port}`));