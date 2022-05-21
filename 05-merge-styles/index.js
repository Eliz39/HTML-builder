const fs = require('fs');
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);

const pathFolder = path.join(__dirname, 'styles');
const pathStyle = path.join(__dirname, 'project-dist', 'bundle.css');
const output = fs.createWriteStream(pathStyle);

async function readFolder() {
  let files;
  try {
    files = await readdir(pathFolder);

    files.forEach(function(file) {
      const pathFile = path.join(__dirname, 'styles', `${file}`);

      const extension = path.extname(pathFile).split('.').join('');
      fs.stat(pathFile, (err, file) => {
        if (err) throw err;
        if (file.isFile() && extension == 'css') {
          const readableStream = fs.createReadStream(pathFile, 'utf-8');
          readableStream.on('data', (fileContent) => {
            output.write(fileContent);
          });
        }
      });
    });
  }
  catch (err) {
    console.error(err);
  }
}
readFolder();