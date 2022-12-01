import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const inputFile = await readFile(resolve(dirname(fileURLToPath(import.meta.url)), './input.txt'), 'utf-8');

const input = inputFile.split('\n\n').map((line) => line.split('\n').map((x) => Number.parseInt(x, 10)).filter(Boolean));


const list = input.map((line) => line.reduce((acc, x) => acc+x, 0));


console.log(list[0]);

list.sort((a, b) => b-a);


console.log(list[0] + list[1] + list[2]);