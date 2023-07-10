const fs = require('fs');
const path = require('path');


const readData = (model) => {
  const filePath = path.join(__dirname, `../models/${model}.json`);
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writeData = (model, data) => {
  const filePath = path.join(__dirname, `../models/${model}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};


module.exports = { readData, writeData };