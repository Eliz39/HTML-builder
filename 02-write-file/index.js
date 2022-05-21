let fs = require('fs');
const path = require('path');
const { stdin , stdout} = require('process');
const readLine = require('readline');

const filePath = path.join(__dirname, 'text.txt');
const toWrite = fs.createWriteStream(filePath);

const rl = readLine.createInterface({
  input: stdin,
  output: stdout,
});

rl.question('Доброго вечора, ми з України! Натисни Enter і напиши щось', () => {
  rl.on('line', (input) => {
    if (input !== 'exit') {
      toWrite.write(`${input}\n`);
    }
    else {
      rl.close();
    }
  });
  rl.on('close', () => {
    stdout.write('Допобачення!');
  });
});
