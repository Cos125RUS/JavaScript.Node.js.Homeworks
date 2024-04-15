const express = require('express');
const path = require('path');

const count = require('./count');
const pages = require('./pages');

require('dotenv').config();

const port = process.env.PORT || 8080;

const countPath = path.join(__dirname, process.env.COUNT);
const counter = count.load(countPath);

const app = express();

app.use((req, res, next) => {
    counter[req.url]++;
    count.write(countPath, counter);
    next();
});

app.get('/', (req, res) => {
    res.send(pages.home(counter['/']));
});

app.get('/about', (req, res) => {
    res.send(pages.about(counter['/about']));
});

app.listen(port, () => console.log(`Started on port ${port}`));