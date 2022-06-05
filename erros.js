//import chalk from 'chalk'; O chalk apresenta incompatibilidade com o Jest para rodar tests é preciso comentá-lo
// O Jest está com problemas com uso de modules e por isso foi preciso utilizar a versão test do Jest e comentar o chalk

export const cureErrorFile = (error) => {
  throw new Error(
    //chalk.red('Error: durante a abertura do arquivo de texto. / '+ error)
    'Error: durante a abertura do arquivo de texto. / '+ error
  );
}
export const cureErrorFinding = (type,number) => {
  throw new Error(
    //chalk.red(`Error: cannot find the ${type} number (${number}).` )
    `Error: cannot find the ${type} number (${number}).` 
  );
}