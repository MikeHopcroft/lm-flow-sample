import z from 'zod';
import dedent from 'dedent';

import {main, ModelLink, POJO, templatedInput} from 'lm-flow';

// Type Context will replace POJO
// interface Context {
//   user: string;
//   date: Date;
// }

export const model1: ModelLink<string, number, boolean> = {
  type: 'model',
  name: 'openai',
  model: 'openai-3.5-turbo-16k',
  input: templatedInput<string, POJO>(
    dedent`
      You are an assistant that counts the number of words in the user text prompt.
      Return only the number.
    `,
    dedent`
      {{input}}
    `
  ),
  output: async (completion: string) => Number(completion),
  judge: async (observed: number, expected: number) => observed === expected,
  validators: {
    input: z.string(),
    output: z.number(),
  },
};

main(model1, []);
