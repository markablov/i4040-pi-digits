import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import compiler from 'i40xx-asm';

export const compileCode = async (fileName) => {
  const sourceCode = await readFile(resolve(dirname(fileURLToPath(import.meta.url)), '../', fileName), 'utf8');

  const { data: rom, errors } = compiler(sourceCode);
  if (Array.isArray(errors) && errors.length) {
    console.log('COULD NOT PARSE SOURCE CODE!');
    console.log(errors);
    process.exit(1);
  }

  console.log(`Source code has been compiled, ram size = ${rom.length} bytes`);

  return { rom, sourceCode };
};
