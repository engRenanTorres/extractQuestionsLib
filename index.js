// import chalk from 'chalk';  O chalk apresenta incompatibilidade com o Jest para rodar tests é preciso comentá-lo
// O Jest está com problemas com uso de modules e por isso foi preciso utilizar a versão test do Jest(caminho do scrit test foi alterado) e comentar o chalk
//nas condicoes normais do jest o scprit test deve ser "jest ./test"
import fs from 'fs';
import {cureErrorFile,cureErrorFinding} from './erros.js';

let originalText = [];

//divide a string em um objeto com multiplas questões... Dados entrada: Questão única, número da questão
export function createQuestionObject (questionString,number) {
  //regex para separar o enunciado e as alternativas
  const regexString = 
    '(.*)(?=\\(A\\))|'+
    '(?<=\\(A\\))(.*)(?=\\(B\\))|'+
    '(?<=\\(B\\))(.*)(?=\\(C\\))|'+
    '(?<=\\(C\\))(.*)(?=\\(D\\))|'+
    '(?<=\\(D\\))(.*)(?=\\(E\\))|'+
    '(?<=\\(E\\))(.*)';
  const regex = new RegExp(regexString,'gm');
  let array = questionString.match(regex);
  array.splice(1,1);
  const object = {
      "numero": number,"banca": "Cesgranrio","nivel": "superior", 
      "cargo": "Engenharia", "concurso": "Eletronuclear","ano":  2022,"assunto": "",
      "enunciado": array[0],
      "alternativas":[ array[1], array[2], array[3],array[4],array[5]],
      "resposta":""
  }
  //Verifica se todas as alternativas foram encontradas
  try{
    object.alternativas.forEach((alternative)=>{
      if(alternative === undefined) throw "Error";
    })
  } catch (error){
    cureErrorFinding("alternatives",number)
  }
  return(object);
}

export const extractQuestions = (text,start)=> {
  const end = start + 1;
  //busca a questao de numero start, pega todo texto entre start e start+1
  let regexString = `(?<=${start})([\\s\\S]*?)(?=${end})`;
  const regex = new RegExp(regexString,'gm');
  const questionExtracted = text.match(regex);
  try {
    //Remove todas as quebras de linhas
    const formated = questionExtracted[0].replace(/(\r\n|\n|\r)/gm, " ");
    return createQuestionObject(formated,start);
  }catch {
    console.log(`Error: there is something wrong with question ${start}!`/*chalk.red(`Error: there is something wrong with question ${start}!`)*/);
  }
}

const listQuestions = (text,initalNumber,finalNumber) => {
  let arrayQuestions = [];
  let question = {}
  for (let i = initalNumber; i <= finalNumber; i++){
    question = extractQuestions(text,i);
    arrayQuestions.push(question);
  }
  return (arrayQuestions);
}

export default async function catchFile(filePath,initalNumber,finalNumber)
{
  const encoding = 'utf-8';
  try {
    originalText =  await fs.promises.readFile(filePath,encoding);
    console.log(`Arquivo encontrado: ok!`/*chalk.green(`Arquivo encontrado: ok!`)*/);
  } catch (error){
    cureErrorFile(error);
  }
  let jsonContent = JSON.stringify(listQuestions(originalText,initalNumber,finalNumber))
  await fs.promises
    .writeFile("./files/newQuestions.json",jsonContent,'utf8');
  //console.log(listQuestions(originalText,initalNumber,finalNumber));
}