import c from 'ansi-colors';
import { existsSync, writeFileSync } from 'fs';
import path from 'path';
import { compile, compileString } from 'sass';

const DO = `[ ${c.gray('do')} ]`;
const OK = `[ ${c.green('ok')} ]`;
const ERROR = `[${c.red('error')}]`;

const SPACE = ' ';
const DOUBLE_SPACE = '  ';
const QUAD_SPACE = '    ';
const OPEN_BRACKET = '{';
const CLOSED_BRACKET = '}';
const LINE_BREAK = '\n';
const SEMICOLON = ';';
const MEDIA = '@';
const EMPTY_STRING = '';
const COMMA = ',';

let medias = [{ name: '@media only screen', classes: [] }];
let parentIndex = 0;
let classIndex = 0;

const inputFileName = (process.argv[2] === 'optimize' ? process.argv[3] : process.argv[2]) ?? './dist/layout.css';
const inputFile = path.parse(inputFileName);
if (!existsSync(inputFileName)) {
  logError(`File ${inputFileName} does not exists.`);
}
const outputFileName = (process.argv[2] === 'optimize' ? process.argv[4] : process.argv[3]) ?? (inputFile.dir + '/' + inputFile.name + '.min' + inputFile.ext);

console.log(`${DO} Optimize ${inputFileName} file.`);

let lines;
try {
  lines = compile(path.format(inputFile)).css.split(LINE_BREAK);
} catch (err) {
  logError(`Error reading file: ${inputFileName}`, err);
}

try {
  let nl = false;
  lines.forEach(line => {
    if (condition(line, MEDIA, SEMICOLON)) {
      medias.findIndex(m => m.name === getName(line));
    } else if (condition(line, MEDIA, OPEN_BRACKET)) {
      const index = medias.findIndex(m => m.name === getName(line));
      parentIndex = index >= 0 ? index : medias.push({ name: getName(line), classes: [] }) - 1;
    } else if (condition(line, DOUBLE_SPACE, COMMA)) {
      classIndex = medias[parentIndex].classes.push({ name: getName(line), css: [] }) - 1;
      nl = true;
    } else if (condition(line, DOUBLE_SPACE, OPEN_BRACKET)) {
      if (nl) {
        medias[parentIndex].classes[classIndex].name += getName(line);
        nl = false;
      } else {
        classIndex = medias[parentIndex].classes.push({ name: getName(line), css: [] }) - 1;
      }
    } else if (condition(line, QUAD_SPACE, SEMICOLON)) {
      medias[parentIndex].classes[classIndex].css.push(line);
    } else if (line.endsWith(OPEN_BRACKET)) {
      classIndex = medias[0].classes.push({ name: getName(line), css: [] }) - 1;
    } else if (condition(line, DOUBLE_SPACE, SEMICOLON)) {
      medias[0].classes[classIndex].css.push(line);
    }
  });
} catch (err) {
  logError(`Error processing file: ${inputFileName}`, err);
}

medias.forEach(media => {
  for (let i = 0; i < media.classes.length; i++) {
    const doubles = media.classes.filter(c => c.name !== media.classes[i].name && JSON.stringify(c.css) === JSON.stringify(media.classes[i].css));
    media.classes[i].name += doubles.map(d => COMMA + d.name).join(EMPTY_STRING);
    doubles.forEach(d => media.classes.splice(media.classes.indexOf(d), 1));
  }
});

console.log(`${DO} Write new ${outputFileName} file.`);

try {
  writeFileSync(
    outputFileName,
    compileString(medias.map(m => m.name + OPEN_BRACKET + m.classes.map(c => c.name + OPEN_BRACKET + c.css.join(EMPTY_STRING) + CLOSED_BRACKET).join(EMPTY_STRING) + CLOSED_BRACKET).join(EMPTY_STRING), { style: 'compressed' }).css
  );
} catch (err) {
  logError(`Error writing file: ${outputFileName}`, err);
}

console.log(`${OK} Optimization successful.`);

function getName(line) {
  return line.replace(DOUBLE_SPACE, EMPTY_STRING).replace(SPACE + OPEN_BRACKET, EMPTY_STRING);
}

function condition(line, startsWith, endsWith) {
  return line.startsWith(startsWith) && line.endsWith(endsWith);
}

function logError(message, err) {
  console.log(ERROR, message);
  if (err) {
    console.error(err);
  }
  process.exit(1);
}
