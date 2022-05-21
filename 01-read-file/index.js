const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
let data = '';

const readableStream = fs.createReadStream(filePath, 'utf8');

readableStream.on('data', (fileContent) => {
  data += fileContent;
});
readableStream.on('end', () => {
  console.log(data);
});