import fs from 'fs';
import recast from 'recast';

const data = fs.readFileSync('./testData.js', 'utf8');



const a = recast.parse(data);
console.log(a);
