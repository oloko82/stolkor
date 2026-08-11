import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const galleryJson = path.join(root, 'src', 'data', 'gallery.json');
const manifestJson = path.join(root, 'src', 'data', 'gallery-optimized.json');
const outputDir = path.join(publicDir, 'images', 'gallery-optimized');

const variants = [
  { target: 480, quality: 78 },
  { target: 960, quality: 80 },
  { target: 1600, quality: 82 },
];

function sourceFile(src) {
  const clean = src.split('?')[0].split('#')[0].replace(/^\/+/, '');
  return path.join(publicDir, ...clean.split('/'));
}

function safeName(src) {
  const file = decodeURIComponent(src.split('/').pop() || 'image');
  const stem = file.replace(/\.[^.]+$/, '');

  return (
    stem
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'image'
  );
}

async function fileExists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function optimize(src) {
  const input = sourceFile(src);

  if (!(await fileExists(input))) {
    throw new Error(`Nie znaleziono zdjęcia: ${src}\nPlik: ${input}`);
  }

  const bytes = await fs.readFile(input);
  const contentHash = crypto
    .createHash('sha1')
    .update(bytes)
    .digest('hex')
    .slice(0, 10);

  const originalMeta = await sharp(bytes, { failOn: 'none' })
    .rotate()
    .metadata();

  const originalWidth = originalMeta.width || 1;
  const originalHeight = originalMeta.height || 1;

  const sources = [];
  const seenWidths = new Set();

  for (const variant of variants) {
    const outputName = `${safeName(src)}-${contentHash}-${variant.target}.webp`;
    const outputFile = path.join(outputDir, outputName);

    const info = await sharp(bytes, { failOn: 'none' })
      .rotate()
      .resize({
        width: variant.target,
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({
        quality: variant.quality,
        effort: 4,
        smartSubsample: true,
      })
      .toFile(outputFile);

    // Nie dodawaj identycznych szerokości kilka razy dla małych źródeł.
    if (!seenWidths.has(info.width)) {
      seenWidths.add(info.width);

      sources.push({
        width: info.width,
        height: info.height,
        src: `/images/gallery-optimized/${outputName}`,
      });
    }
  }

  sources.sort((a, b) => a.width - b.width);

  return {
    originalWidth,
    originalHeight,
    ratio: originalHeight / originalWidth,
    sources,
    fallback: sources.at(-1)?.src ?? src,
  };
}

async function main() {
  const gallery = JSON.parse(await fs.readFile(galleryJson, 'utf8'));

  if (!Array.isArray(gallery.images)) {
    throw new Error('gallery.json nie zawiera tablicy "images".');
  }

  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });

  const manifest = { images: {} };

  console.log(`Optymalizacja ${gallery.images.length} zdjęć...`);

  for (let i = 0; i < gallery.images.length; i++) {
    const item = gallery.images[i];

    if (!item?.src) {
      throw new Error(`Brak "src" przy zdjęciu nr ${i + 1}.`);
    }

    console.log(`[${i + 1}/${gallery.images.length}] ${item.src}`);
    manifest.images[item.src] = await optimize(item.src);
  }

  await fs.writeFile(
    manifestJson,
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  );

  console.log('Gotowe: responsywne WebP 480 / 960 / 1600 px.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
