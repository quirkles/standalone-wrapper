const fs = require('fs');
const path = require('path')
const editJsonFile = require("edit-json-file");
const fileEditor = editJsonFile(`${__dirname}/lib/manifest.json`);

const libDir = path.join(__dirname, 'lib');

console.log(libDir);

if(!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir)
}

fs.readdirSync(libDir).forEach((file) => {
    if ( file.indexOf('.js') > 0 && file.indexOf('.map') < 0 && file.indexOf('.json') < 0 ) {
        fileEditor.set(`${file.split('.')[0]}js`, file);
    }
    fileEditor.save();
}, err => {
    console.error(err);
});