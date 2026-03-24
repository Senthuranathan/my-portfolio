const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('senthuranathan - resume.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(err => console.log(err));
