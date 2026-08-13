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

function normalizedStem(src) {
  const fileName = decodeURIComponent(src.split('/').pop() || 'image');
  const stem = fileName.replace(/\.[^.]+$/, '');

  return (
    stem
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'image'
  );
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function fileHash(filePath) {
  const data = await fs.readFile(filePath);
  return crypto.createHash('sha1').update(data).digest('hex').slice(0, 12);
}

async function readPreviousManifest() {
  try {
    const raw = await fs.readFile(manifestPath, 'utf8');
    const parsed = JSON.parse(raw);
    return parsed?.images && typeof parsed.images === 'object'
      ? parsed
      : { images: {} };
  } catch {
    return { images: {} };
  }
}

function generatedPaths(stem) {
  const result = {};

  for (const width of widths) {
    const fileName = `${stem}-${width}.webp`;
    result[String(width)] = {
      fileName,
      publicPath: `/images/gallery-optimized/${fileName}`,
      outputPath: path.join(outputDir, fileName),
    };
  }

  return result;
}

async function canReuse(previous, sourceHash, paths) {
  if (!previous || previous.sourceHash !== sourceHash) return false;

  for (const width of widths) {
    if (!(await exists(paths[String(width)].outputPath))) return false;
  }

  return Boolean(previous.width && previous.height && previous.sources);
}

async function optimizeOne(src, previous) {
  const inputPath = publicPathToFile(src);

  if (!(await exists(inputPath))) {
    throw new Error(`Brak pliku galerii: ${src}\nOczekiwano: ${inputPath}`);
  }

  const sourceHash = await fileHash(inputPath);
  const stem = `${normalizedStem(src)}-${sourceHash}`;
  const paths = generatedPaths(stem);

  if (await canReuse(previous, sourceHash, paths)) {
    return {
      reused: true,
      data: previous,
      expectedFiles: widths.map((width) => paths[String(width)].fileName),
    };
  }

  const generated = {};
  let displayWidth = 0;
  let displayHeight = 0;

  for (const width of widths) {
    const target = paths[String(width)];

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
      .toFile(target.outputPath);

    generated[String(width)] = target.publicPath;

    if (width === 1600) {
      displayWidth = info.width;
      displayHeight = info.height;
    }
  }

  return {
    reused: false,
    data: {
      sourceHash,
      width: displayWidth,
      height: displayHeight,
      sources: generated,
    },
    expectedFiles: widths.map((width) => paths[String(width)].fileName),
  };
}

async function removeStaleFiles(expectedFiles) {
  const expected = new Set(expectedFiles);

  let entries = [];
  try {
    entries = await fs.readdir(outputDir, { withFileTypes: true });
  } catch {
    return;
  }

  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && !expected.has(entry.name))
      .map((entry) => fs.rm(path.join(outputDir, entry.name), { force: true })),
  );
}

async function main() {
  const gallery = JSON.parse(await fs.readFile(galleryJsonPath, 'utf8'));

  if (!Array.isArray(gallery.images)) {
    throw new Error('src/data/gallery.json nie zawiera tablicy "images".');
  }

  await fs.mkdir(outputDir, { recursive: true });

  const previousManifest = await readPreviousManifest();
  const manifest = { images: {} };
  const expectedFiles = [];

  let reused = 0;
  let optimized = 0;

  console.log(`Galeria: ${gallery.images.length} zdjęć`);

  for (let index = 0; index < gallery.images.length; index++) {
    const item = gallery.images[index];

    if (!item?.src) {
      throw new Error(`Brak pola "src" dla zdjęcia nr ${index + 1}.`);
    }

    const result = await optimizeOne(
      item.src,
      previousManifest.images[item.src],
    );

    manifest.images[item.src] = result.data;
    expectedFiles.push(...result.expectedFiles);

    if (result.reused) {
      reused++;
      console.log(
        `[${index + 1}/${gallery.images.length}] POMINIĘTO (bez zmian): ${item.src}`,
      );
    } else {
      optimized++;
      console.log(
        `[${index + 1}/${gallery.images.length}] OPTYMALIZACJA: ${item.src}`,
      );
    }
  }

  await removeStaleFiles(expectedFiles);

  await fs.writeFile(
    manifestPath,
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
  console.error('');
  console.error('Błąd optymalizacji obrazów:');
  console.error(error);
  process.exit(1);
});
