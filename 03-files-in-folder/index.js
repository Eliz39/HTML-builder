const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const pathFolder = path.join(__dirname, 'secret-folder');

async function readFolder() {
  let files;
  try {
    files = await readdir(pathFolder);

    files.forEach(function(file) {
      const pathFile = path.join(__dirname, 'secret-folder', `${file}`);
      const extension = path.extname(pathFile).split('.').join('');
      const nameFile = path.parse(pathFile).name;
      fs.stat(pathFile, (err, file) => {
        if (err) throw err;
        if (file.isFile()){
          console.log(`${nameFile} - ${extension} - ${file.size}b`);
        }
      });
    });
  }
  catch (err) {
    console.error(err);
  }
}
readFolder();
