const fs = require('fs');
const path = require('path');
const util = require('util');
const fsPromises = require('fs').promises;
const readdir = util.promisify(fs.readdir);
// const {pipeline} = require('stream');

const mkDir = async () => {
  const pathDistFolder = path.join(__dirname, 'project-dist');
  try {
    await fsPromises.mkdir(pathDistFolder, {recursive: true}, () => {});
    mkAssetsDir();
  } catch (err) {
    if (err) throw err;
  }
};
mkDir();

const pathAssetsDist =  path.join(__dirname, 'project-dist', 'assets');
// const pathAssetsFolder = path.join(__dirname, 'assets');

const mkAssetsDir = async () => {
  try {
    await fsPromises.mkdir(pathAssetsDist, {recursive: true}, () => {});
    // copyAssets(pathAssetsFolder);
  } catch (err) {
    if (err) throw err;
  }
};


const pathFolderStyles = path.join(__dirname, 'styles');
const pathNewStyle = path.join(__dirname, 'project-dist', 'style.css');

async function bundleCSS() {
  let files;
  try {
    files = await readdir(pathFolderStyles);
    const output = fs.createWriteStream(pathNewStyle);
    files.forEach(function(file) {
      const pathStyleFile = path.join(__dirname, 'styles', `${file}`);
      const extension = path.extname(pathStyleFile).split('.').join('');

      fs.stat(pathStyleFile, (err, file) => {
        if (err) throw err;
        if (file.isFile() && extension == 'css') {

          const readableStream = fs.createReadStream(pathStyleFile, 'utf-8');

          // pipeline(readableStream, output, (err) => {if (err) throw err;});
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
bundleCSS();

const pathHTML = path.join(__dirname, 'template.html');
let htmlFile = '';
const readStreamHtmlFile = fs.createReadStream(pathHTML, 'utf-8');

readStreamHtmlFile.on('data', (chunk) => {
  htmlFile += chunk;
});

readStreamHtmlFile.on('end', () => {
  const regexp = new RegExp('{{.+}}','gi');
  const template = htmlFile.match(regexp);

  template.forEach(fileName => {
    let componentHtml = '';
    const component = `${fileName.slice(2, -2)}.html`;
    const filePath = path.join(__dirname, 'components', component);
    let readStreamComponent = fs.createReadStream(filePath, 'utf-8');
    readStreamComponent.on('data', (chunk) => {
      componentHtml += chunk;
    });
    readStreamComponent.on('end', () => {
      htmlFile = htmlFile.replace(fileName, componentHtml);
      fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), htmlFile, () => {});
    });
  });
});


