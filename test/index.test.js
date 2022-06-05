import { createQuestionObject , extractQuestions} from '../index.js';

//.toBe é só para variáveis simples
//.toEqual é para comparar arrays e object

const questionSample = '26 No contexto das diretrizes de gestão de riscos, apresenta-das na norma ABNT NBR ISO 31000:2018, o processo deavaliação de um risco engloba as três seguintes etapas:(A) escopo, contexto e critério; análise de risco; tratamen-to de riscos(B) escopo, contexto e critério; identificação de risco; aná-lise de risco(C) identificação de risco; análise de risco; tratamento derisco(D) identificação de risco; análise de risco; avaliação derisco(E) análise de risco; avaliação de riscos; tratamento derisco'


describe('createQuestionObject::', () => {
  it('A função deve retornar um objet', () =>
    {
      expect(typeof createQuestionObject(questionSample, 26)).toBe('object');
    }
  )
  it('A função deve separar 5 alternativas,retorna array com 5 alternativas', () => 
    {
      const questionObject = createQuestionObject(questionSample, 26);
      expect(questionObject.alternativas.length).toBe(5);
    }
  )
/*  it('A função está relatando problemas corretamente problemas na abertura de questões inexistentes',
    () => {
      expect(createQuestionObject(questionSample, 40)).rejects.toThrow('Error: there is something wrong with question 40!');
    }

  )*/

})
