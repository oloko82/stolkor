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

async function contentHash(input) {
  const bytes = await fs.readFile(input);
  return {
    bytes,
    hash: crypto.createHash('sha1').update(bytes).digest('hex').slice(0, 10),
  };
}

async function readPreviousManifest() {
  try {
    const raw = await fs.readFile(manifestJson, 'utf8');
    const parsed = JSON.parse(raw);

    if (parsed?.images && typeof parsed.images === 'object') {
      return parsed;
    }
  } catch {}

  return { images: {} };
}

function outputFileFromPublicSrc(src) {
  return path.join(publicDir, ...src.replace(/^\/+/, '').split('/'));
}

async function previousCanBeReused(previous, hash) {
  if (!previous || previous.sourceHash !== hash) return false;
  if (!Array.isArray(previous.sources) || previous.sources.length === 0) return false;
  if (!previous.fallback || !previous.originalWidth || !previous.originalHeight) return false;

  for (const source of previous.sources) {
    if (!source?.src || !source?.width || !source?.height) return false;
    if (!(await fileExists(outputFileFromPublicSrc(source.src)))) return false;
  }

  return true;
}

async function optimize(src, previous) {
  const input = sourceFile(src);

  if (!(await fileExists(input))) {
    throw new Error(`Nie znaleziono zdjęcia: ${src}\nPlik: ${input}`);
  }

  const { bytes, hash } = await contentHash(input);

  if (await previousCanBeReused(previous, hash)) {
    return {
      reused: true,
      data: previous,
    };
  }

  const originalMeta = await sharp(bytes, { failOn: 'none' })
    .rotate()
    .metadata();

  const originalWidth = originalMeta.width || 1;
  const originalHeight = originalMeta.height || 1;

  const sources = [];
  const seenWidths = new Set();

  for (const variant of variants) {
    const outputName = `${safeName(src)}-${hash}-${variant.target}.webp`;
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
    reused: false,
    data: {
      // Dodatkowe pole dla incremental cache.
      // Gallery.astro je ignoruje, więc zachowujemy pełną kompatybilność.
      sourceHash: hash,
      originalWidth,
      originalHeight,
      ratio: originalHeight / originalWidth,
      sources,
      fallback: sources.at(-1)?.src ?? src,
    },
  };
}

async function removeStaleFiles(manifest) {
  const expected = new Set();

  for (const item of Object.values(manifest.images)) {
    for (const source of item.sources ?? []) {
      if (source?.src) {
        expected.add(path.basename(source.src));
      }
    }
  }

  let entries = [];
  try {
    entries = await fs.readdir(outputDir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    if (entry.isFile() && !expected.has(entry.name)) {
      await fs.rm(path.join(outputDir, entry.name), { force: true });
    }
  }
}

async function main() {
  const gallery = JSON.parse(await fs.readFile(galleryJson, 'utf8'));

  if (!Array.isArray(gallery.images)) {
    throw new Error('gallery.json nie zawiera tablicy "images".');
  }

  await fs.mkdir(outputDir, { recursive: true });

  const previousManifest = await readPreviousManifest();
  const manifest = { images: {} };

  let reused = 0;
  let optimized = 0;

  console.log(`Galeria: ${gallery.images.length} zdjęć`);

  for (let i = 0; i < gallery.images.length; i++) {
    const item = gallery.images[i];

    if (!item?.src) {
      throw new Error(`Brak "src" przy zdjęciu nr ${i + 1}.`);
    }

    const result = await optimize(
      item.src,
      previousManifest.images?.[item.src],
    );

    manifest.images[item.src] = result.data;

    if (result.reused) {
      reused++;
      console.log(`[${i + 1}/${gallery.images.length}] POMINIĘTO: ${item.src}`);
    } else {
      optimized++;
      console.log(`[${i + 1}/${gallery.images.length}] OPTYMALIZACJA: ${item.src}`);
    }
  }

  await removeStaleFiles(manifest);

  await fs.writeFile(
    manifestJson,
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  );

  console.log('');
  console.log(`Gotowe. Bez zmian: ${reused}, zoptymalizowano: ${optimized}.`);

  if (optimized === 0) {
    console.log('Nie wykonywano ponownej kompresji zdjęć.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
