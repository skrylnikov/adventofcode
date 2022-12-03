import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const inputFile = await readFile(resolve(dirname(fileURLToPath(import.meta.url)), './input.txt'), 'utf-8');

const input = inputFile.split('\n').map((line) => line.split(' '));

const map1 = {
  'X': 1,
  'Y': 2,
  'Z': 3,
};

const result = input.reduce((acc, [a, b]) => {
  const bonus = map1[b as keyof typeof map1];


  if ((a === 'A' && b === 'X') || (a === 'B' && b === 'Y') || (a === 'C' && b === 'Z')) {
    return acc + bonus + 3;
  }

  if ((a === 'A' && b === 'Z') || (a === 'C' && b === 'Y') || (a === 'B' && b === 'X')) {
    return acc + bonus;
  }

  return acc + bonus + 6;
}, 0);

console.log(result);


const map2 = {
  'X': 0,
  'Y': 3,
  'Z': 6,
};

const loseMap = {
  'A': 'C',
  'B': 'A',
  'C': 'B',
};

const winMap = Object.fromEntries(Object.entries(loseMap).map(([a, b]) => [b, a]));

const costMap = {
  'A': 1,
  'B': 2,
  'C': 3,
}

const result2 = input.reduce((acc, [a, result]) => {
  const bonusValue = map2[result as keyof typeof map2];

  if(bonusValue === 0) {
    return acc + costMap[loseMap[a as keyof typeof loseMap] as keyof typeof costMap];
  }

  if(bonusValue === 3) {
    return acc + costMap[a as keyof typeof costMap] + bonusValue;
  }

  return acc + costMap[winMap[a as keyof typeof winMap] as keyof typeof costMap] + bonusValue;
    
}, 0);

console.log(result2);
