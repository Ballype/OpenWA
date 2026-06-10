const fs = require('fs');
fs.copyFileSync('.env.minimal', '.env');
fs.mkdirSync('./data/sessions', { recursive: true });
fs.mkdirSync('./data/media', { recursive: true });
console.log('.env created from .env.minimal');
console.log('data/sessions and data/media directories created');
