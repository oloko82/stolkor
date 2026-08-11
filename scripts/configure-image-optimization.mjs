import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const packagePath = path.join(root, 'package.json');
const gitignorePath = path.join(root, '.gitignore');

const pkg = JSON.parse(await fs.readFile(packagePath, 'utf8'));

pkg.scripts ??= {};
pkg.scripts['optimize:gallery'] = 'node scripts/optimize-gallery.mjs';
pkg.scripts.predev = 'npm run optimize:gallery';
pkg.scripts.prebuild = 'npm run optimize:gallery';

await fs.writeFile(
  packagePath,
  `${JSON.stringify(pkg, null, 2)}\n`,
  'utf8',
);

let gitignore = '';
try {
  gitignore = await fs.readFile(gitignorePath, 'utf8');
} catch {}

const entries = [
  'public/images/gallery-optimized/',
  'src/data/gallery-optimized.json',
];

for (const entry of entries) {
  if (!gitignore.split(/\r?\n/).includes(entry)) {
    gitignore = `${gitignore.trimEnd()}\n${entry}\n`;
  }
}

await fs.writeFile(gitignorePath, gitignore, 'utf8');

console.log('Zaktualizowano package.json i .gitignore.');
