// app/index.js
const calc = require('./calc');
const fs = require('fs');
const _ = require('lodash')

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
