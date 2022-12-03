import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { last } from 'remeda';

const inputFile = await readFile(resolve(dirname(fileURLToPath(import.meta.url)), './input.txt'), 'utf-8');

const inputList = inputFile.split('\n');

const input = inputList.map((line) => ({
    first: line.substring(0, line.length/2).split(''),
    second: line.substring(line.length/2).split(''),
}));

const result1 = input.reduce((acc, {first, second}) => {
    const secondSet = new Set(second);

    const item = first.filter(x => secondSet.has(x))[0];
    
    const charCode = item.charCodeAt(0);

    if(charCode >= 97) {
        return acc + charCode - 96;
    }

    return acc + charCode - 38;
}, 0);

console.log(result1);


const list: Array<[string[], string[], string[]]> = [];

for(let i = 0; i < inputList.length; i++) {
    if(i % 3 === 0) {
        list.push([] as any);
    }

    last(list)?.push(inputList[i].split(''));
}

const result2 = list.reduce((acc, [first, second, third]) => {
    const secondSet = new Set(second);
    const thirdSet = new Set(third);

    const item = first.filter(x => secondSet.has(x) && thirdSet.has(x))[0];
    
    const charCode = item.charCodeAt(0);

    if(charCode >= 97) {
        return acc + charCode - 96;
    }

    return acc + charCode - 38;
}, 0);

console.log(result2);


