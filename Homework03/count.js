'use strict'

const fs = require('fs');

const load = (path) => {
    let counter = {};
    if (fs.existsSync(path)){
        counter = JSON.parse(fs.readFileSync(path, 'utf8'));
    } else {
        counter['/'] = 0;
        counter['/about'] = 0;
    }
    return counter;
}

const write = (path, count) => {
    fs.writeFileSync(path, JSON.stringify(count));
}

module.exports = { load, write };