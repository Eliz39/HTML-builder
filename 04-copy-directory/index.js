const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);

const pathNewFolder = path.join(__dirname, 'files-copy');
const pathFolder = path.join(__dirname, 'files');


const mkDir = async () => {
  try {
    await fsPromises.mkdir(pathNewFolder, {recursive: true}, () => {});
    clearDir();
  } catch (err) {
    if (err) throw err;
  }
};

const clearDir = () => {
  fs.readdir(pathNewFolder, (err, files) => {
    if (err) throw err;
    if (files.length) {
      for (let file of files) {
        let pathNewFile = path.join(__dirname, 'files-copy', `${file}`);
        fs.stat(pathNewFile, (err, stats) => {
          if (err) throw err;
          if (!stats.isDirectory()) {
            fs.unlink(pathNewFile, err => {
              if (err) throw err;
              if (file === files[files.length - 1]) readFolder();
            });
          }
        });
      }
    } else readFolder();
  });
};

async function readFolder() {
  let files;
  try {
    files = await readdir(pathFolder);
    files.forEach(function(file) {
      let pathFile = path.join(__dirname, 'files', `${file}`);
      let pathNewFile = path.join(__dirname, 'files-copy', `${file}`);

      fsPromises.copyFile(`${pathFile}`, `${pathNewFile}`)
        .catch(function(error) {
          console.log(error);
        });
    });
    console.log('Files Copied');
  }
  catch (err) {
    console.error(err);
  }
}
mkDir();



