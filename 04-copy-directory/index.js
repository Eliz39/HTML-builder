const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);

const pathNewFolder = path.join(__dirname, 'files-copy');
const pathFolder = path.join(__dirname, 'files');


fs.mkdir(pathNewFolder, {recursive: true}, () => {});

async function readFolder() {
    let files;
    try {
        files = await readdir(pathFolder);
        files.forEach(function(file) {
            let pathFile = path.join(__dirname, 'files', `${file}`);
            let pathNewFile = path.join(__dirname, 'files-copy', `${file}`);

            fsPromises.copyFile(`${pathFile}`, `${pathNewFile}`)
            // .then(function() {
            //     console.log("File Copied");
            //   })
              .catch(function(error) {
                console.log(error);
              });
        })
    console.log("Files Copied");
    }
    catch (err) {
   console.error(err);
 }
}
readFolder()



