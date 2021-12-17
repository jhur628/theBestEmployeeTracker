const mysql = require('mysql2');
const startPrompt = require('./assets/js/index')
const logo = require('asciiart-logo');
const config = require('./package.json');

console.log(logo(config).render());

startPrompt();