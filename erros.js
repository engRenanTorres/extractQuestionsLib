import chalk from 'chalk';

export const cureErrorFile = (error) => {
  throw new Error(
    chalk.red('Error: durante a abertura do arquivo de texto. / '+ error)
  );
}
export const cureErrorFinding = (type,number) => {
  throw new Error(
    chalk.red(`Error: cannot find the ${type} number (${number}).` )
  );
}