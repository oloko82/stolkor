import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const projectRoot = process.cwd();
const galleryJsonPath = path.join(projectRoot, 'src', 'data', 'gallery.json');
const manifestPath = path.join(projectRoot, 'src', 'data', 'gallery-optimized.json');
const publicDir = path.join(projectRoot, 'public');
const outputDir = path.join(publicDir, 'images', 'gallery-optimized');

const widths = [480, 960, 1600];

const webpQuality = {
  480: 78,
  960: 80,
  1600: 82,
};

function publicPathToFile(src) {
  const clean = src.split('?')[0].split('#')[0].replace(/^\/+/, '');
  return path.join(publicDir, ...clean.split('/'));
}

function safeStem(src) {
  const fileName = decodeURIComponent(src.split('/').pop() || 'image');
  const stem = fileName.replace(/\.[^.]+$/, '');

  const normalized = stem
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const hash = crypto
    .createHash('sha1')
    .update(src)
    .digest('hex')
    .slice(0, 8);

  return `${normalized || 'image'}-${hash}`;
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function optimizeOne(src) {
  const inputPath = publicPathToFile(src);

  if (!(await exists(inputPath))) {
    throw new Error(`Brak pliku galerii: ${src}\nOczekiwano: ${inputPath}`);
  }

  const stem = safeStem(src);
  const generated = {};

  let displayWidth = 0;
  let displayHeight = 0;

  for (const width of widths) {
    const fileName = `${stem}-${width}.webp`;
    const outputPath = path.join(outputDir, fileName);

    const info = await sharp(inputPath)
      .rotate()
      .resize({
        width,
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({
        quality: webpQuality[width],
        effort: 4,
        smartSubsample: true,
      })
      .toFile(outputPath);

    generated[String(width)] = `/images/gallery-optimized/${fileName}`;

    if (width === 1600) {
      displayWidth = info.width;
      displayHeight = info.height;
    }
  }

  return {
    width: displayWidth,
    height: displayHeight,
    sources: generated,
  };
}

async function main() {
  const gallery = JSON.parse(await fs.readFile(galleryJsonPath, 'utf8'));

  if (!Array.isArray(gallery.images)) {
    throw new Error('src/data/gallery.json nie zawiera tablicy "images".');
  }

  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });

  const manifest = {
    images: {},
  };

  console.log(`Optymalizacja galerii: ${gallery.images.length} zdjęć`);

  for (let index = 0; index < gallery.images.length; index++) {
    const item = gallery.images[index];

    if (!item?.src) {
      throw new Error(`Brak pola "src" dla zdjęcia nr ${index + 1}.`);
    }

    console.log(`[${index + 1}/${gallery.images.length}] ${item.src}`);

    manifest.images[item.src] = await optimizeOne(item.src);
  }

  await fs.writeFile(
    manifestPath,
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  );

  console.log('');
  console.log('Gotowe: wygenerowano WebP 480 / 960 / 1600 px.');
}

main().catch((error) => {
  console.error('');
  console.error('Błąd optymalizacji obrazów:');
  console.error(error);
  process.exit(1);
});
