import catchFile from "./index.js";
import chalk from 'chalk';


const paths = process.argv;
const initialNumber = parseInt(paths[2]);
let finalNumber = parseInt(paths[3]);
let pathInput = paths[4];

if (isNaN(initialNumber)) throw new Error(chalk.red("Error: question number not defined"))
if (isNaN(finalNumber)) {
  console.log(finalNumber);
  finalNumber = initialNumber+1;
}
if (pathInput === undefined) pathInput = "./files/test.md"; 

catchFile(pathInput,initialNumber,finalNumber);