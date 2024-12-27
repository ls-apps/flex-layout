#! /usr/bin/env node

import c from 'ansi-colors';

try {
  process.title = 'fl ' + process.argv.slice(2).join(' ');
} catch {
  process.title = 'fl';
}

if (process.argv[2] === 'optimize') {
  import('./optimize.js');
} else {
  console.error(`[${c.red('error')}] Option ${c.italic(c.bold(process.argv[2]))} does not exists.`);
  console.info(`
  Available options:\n
  ${c.bold('Option')}                                   ${c.bold('Description')}
  optimize <inputFile> <outputFile>        Optimizes a .css file into a .min.css file. <inputFile> & <outputFile> are optional.\n`);
}