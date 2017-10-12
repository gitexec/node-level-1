// app/index.js
const http = require('http');
const express = require('express');
const fs = require('fs');
const _ = require('lodash');

const calc = require('./calc');

//Node server:
//{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}
const httpPort = 3000;
const requestHandler = (request, response) => {
  console.log('url', request.url);
  response.end('Hello Node server');
}
const server = http.createServer(requestHandler);
server.listen(httpPort, (err) => {
  if(err){
    return console.log('error', err);
  }
  console.log(`server is listening on port ${httpPort}`);
})
//{{{{{{{{{{{################}}}}}}}}}}}

//Express basic
//{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}
const app = express();
const expressPort = 3001;
app.get('/', (request, response) => {
  response.send('Hi express server');
});
app.listen(expressPort, (err) => {
  if(err)
    return console.log('something happened', err);
  console.log(`express framework is running on ${expressPort}`)
})
//{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}

//Express pipeline
//{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}
const app2 = express();
const expressPort2 = 3002;
app2.use((err, request, response, next) => {
  if(err){
    console.log('error', err);
    response.status(500).send('broke!');
  }
  console.log('middleware1', request.headers);
  next();
})
app2.use((err, request, response, next) => {
  console.log('error', err);
  request.chance = Math.random();
  next();
})
app2.get('/', (request, response) => {
  response.json({
    chance: request.chance
  })
})
app2.listen(expressPort2);
//{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}
const numbersToAdd = [
  3,
  4,
  10,
  2
]
const result = calc.sum(numbersToAdd)
console.log(`The result is: ${result}`)

let a = _.assign({c: 7}, { 'b': 2 });
console.log(a);

let content;
try{
  content = fs.readFileSync("/home/wington/Desktop/JS/hero-node/level1/app/assets/file.txt");
}
catch(e){
  console.log(e);
}
console.log("sync", content.toString());

const numbers = [1,2,3,4];
function isBeggerThanTwo(num) {
  return num > 2;
}
const no = numbers.filter(isBeggerThanTwo);
console.log(no);

fs.readFile("/home/wington/Desktop/JS/hero-node/level1/app/assets/file.txt", function(err, content){
  if(err)
    return console.log(err);

  console.log("async 1st", content.toString());
});

console.log('starting async opening file');
fs.readFile("/home/wington/Desktop/JS/hero-node/level1/app/assets/file.txt", (err, content) => {
  if(err){
    console.log("error opening file");
    return console.log(err);
  }
  console.log("2nd async", content.toString());
})
console.log("end of async opening file")

function stats(file){
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, data) => {
      if(err)
        return reject(err);
        resolve(data);
    })
  })
}

Promise.all([
  stats('/home/wington/Desktop/JS/hero-node/level1/app/assets/file.txt'),
  stats('/home/wington/Desktop/JS/hero-node/level1/app/assets/file.txt'),
  stats('/home/wington/Desktop/JS/hero-node/level1/app/assets/file.txt')
])
.then((data) => console.log(data))
.catch((err) => console.log(err))
