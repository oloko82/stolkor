import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const packageFile = path.join(root, 'package.json');
const gitignoreFile = path.join(root, '.gitignore');

const pkg = JSON.parse(await fs.readFile(packageFile, 'utf8'));

pkg.scripts ??= {};
pkg.scripts['optimize:gallery'] = 'node scripts/optimize-gallery.mjs';
pkg.scripts.predev = 'npm run optimize:gallery';
pkg.scripts.prebuild = 'npm run optimize:gallery';

pkg.devDependencies ??= {};

await fs.writeFile(
  packageFile,
  `${JSON.stringify(pkg, null, 2)}\n`,
  'utf8',
);

let ignore = '';
try {
  ignore = await fs.readFile(gitignoreFile, 'utf8');
} catch {}

const additions = [
  'public/images/gallery-optimized/',
  'src/data/gallery-optimized.json',
];

for (const item of additions) {
  if (!ignore.split(/\r?\n/).includes(item)) {
    ignore = `${ignore.trimEnd()}\n${item}\n`;
  }
}

await fs.writeFile(gitignoreFile, ignore, 'utf8');

console.log('package.json i .gitignore są skonfigurowane.');
