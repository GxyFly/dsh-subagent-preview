import {readFile, writeFile, mkdir, copyFile} from 'node:fs/promises';

const here = file => new URL(file, import.meta.url);
await mkdir(here('./lib/'), { recursive: true });
const model = await readFile(here('./src/model.mjs'), 'utf8');
const client = await readFile(here('./src/client.mjs'), 'utf8');
const css = await readFile(here('./src/style.css'), 'utf8');
const source = model.replace(/^export /gm, '') + '\n'
  + client.replace(/^import .*from '\.\/model\.mjs';\r?\n/, '').replace(/^export /gm, '');
await writeFile(here('./lib/client.js'),
  `window.__ModuleLoader__.load({id:'dsh-subagent-preview',factory:require=>{\nconst css=${JSON.stringify(css)};\n${source}\nreturn {name,inject,apply};\n}});\n`);
await copyFile(here('./src/index.mjs'), here('./lib/index.js'));
