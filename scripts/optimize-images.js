import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

async function processImages() {
  const assetsDir = path.join(rootDir, 'assets');
  if (!fs.existsSync(assetsDir)) {
    console.log('No raw assets directory found — using pre-built images in public/images.');
    return;
  }
  console.log('Optimizing images for web performance...\n');

  const outputBase = path.join(rootDir, 'public', 'images');
  ensureDir(outputBase);
  ensureDir(path.join(outputBase, 'formulastudent'));
  ensureDir(path.join(outputBase, 'portrait'));
  ensureDir(path.join(outputBase, 'dfki'));
  ensureDir(path.join(outputBase, 'texas'));

  // ─── Helper ──────────────────────────────────────────────────
  async function convert(inputPath, outBaseName, opts = {}) {
    if (!fs.existsSync(inputPath)) {
      console.warn(`  SKIP (not found): ${inputPath}`);
      return;
    }
    const { width = 1600, cropBottom = 0 } = opts;
    console.log(`  Processing: ${path.basename(inputPath)} → ${outBaseName}`);

    let pipeline = sharp(inputPath).rotate(); // auto-orient EXIF

    if (cropBottom > 0) {
      // Crop bottom N pixels to hide unwanted text on workshop photo
      const meta = await sharp(inputPath).rotate().metadata();
      const newHeight = meta.height - cropBottom;
      pipeline = pipeline.extract({ left: 0, top: 0, width: meta.width, height: newHeight });
    }

    const webpOut  = path.join(outputBase, outBaseName + '.webp');
    const jpegOut  = path.join(outputBase, outBaseName + '.jpg');

    await pipeline.clone().resize({ width, withoutEnlargement: true }).webp({ quality: 85, effort: 6 }).toFile(webpOut);
    await pipeline.clone().resize({ width, withoutEnlargement: true }).jpeg({ quality: 85, progressive: true }).toFile(jpegOut);
  }

  // ─── 1. Portrait ──────────────────────────────────────────────
  await convert(
    path.join(rootDir, 'assets/portrait/Portrait_Anzug_breit.jpg'),
    'portrait/denis-trautner-portrait',
    { width: 1800 }
  );

  // OpenGraph image
  const ogInput = path.join(rootDir, 'assets/portrait/Portrait_Anzug_breit.jpg');
  if (fs.existsSync(ogInput)) {
    await sharp(ogInput).rotate().resize(1200, 630, { fit: 'cover', position: 'top' })
      .jpeg({ quality: 85 }).toFile(path.join(rootDir, 'public', 'og-image.jpg'));
  }

  // ─── 2. Formula Student ───────────────────────────────────────
  // Existing
  await convert(path.join(rootDir, 'assets/formulastudent/20220513_183319000_iOS.jpg'), 'formulastudent/car-reveal', { width: 1400 });
  await convert(path.join(rootDir, 'assets/formulastudent/20220726_084935220_iOS.jpg'), 'formulastudent/red-bull-ring', { width: 1400 });
  await convert(path.join(rootDir, 'assets/formulastudent/20220821_190006590_iOS.jpg'), 'formulastudent/fsg-podium', { width: 1600 });

  // New FS images
  // Workshop bench with electronics (crop bottom ~110px to hide sign)
  await convert(path.join(rootDir, 'assets/formulastudent/07b299ca-639a-4842-b0e6-ab3bf6123e8a.JPG'), 'formulastudent/workshop-bench', { width: 1600, cropBottom: 110 });
  // Car #77 racing at FSG with motion blur
  await convert(path.join(rootDir, 'assets/formulastudent/20230817_17-18-44_1376_seizinger.JPG'), 'formulastudent/car-racing', { width: 1600 });
  // All teams panorama at Hockenheimring
  await convert(path.join(rootDir, 'assets/formulastudent/20230818_13-12-40_0470_maru.JPG'), 'formulastudent/fsg-teams-panorama', { width: 1800 });
  // FSA 2023 team celebration with big cheque
  await convert(path.join(rootDir, 'assets/formulastudent/IMG_1712.JPG'), 'formulastudent/fsa-2023-cheque', { width: 1600 });

  // ─── 3. DFKI ──────────────────────────────────────────────────
  // Denis holding Master's thesis in front of DFKI sign
  await convert(path.join(rootDir, 'assets/dfki/IMG_5345.jpg'), 'dfki/dfki-thesis', { width: 1400 });

  // ─── 4. Texas ─────────────────────────────────────────────────
  // Prom group photo
  await convert(path.join(rootDir, 'assets/texas/20170507_171551000_iOS.jpg'), 'texas/texas-prom', { width: 1400 });
  // Shooting on a ranch (quintessentially Texan)
  await convert(path.join(rootDir, 'assets/texas/20170525_190415102_iOS.jpg'), 'texas/texas-ranch', { width: 1400 });
  // American football game (Tigers)
  await convert(path.join(rootDir, 'assets/texas/20170531_175024000_iOS.jpg'), 'texas/texas-football', { width: 1400 });

  console.log('\nAll images processed successfully!');
}

processImages().catch(err => {
  console.error('Image processing failed:', err);
  process.exit(1);
});
