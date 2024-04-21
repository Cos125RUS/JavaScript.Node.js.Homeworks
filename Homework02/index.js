#!/usr/bin/env node
'use strict'

const commander = require('commander');
const { generate } = require('./passwordGenerator');

commander.version('1.0.0').option('-s, --size <value>', 'Size or password').parse(process.argv);

console.log(generate(commander.size));

