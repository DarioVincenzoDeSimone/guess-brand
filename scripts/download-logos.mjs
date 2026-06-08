/**
 * Downloads SVG car brand logos from cdn.simpleicons.org for every brand in brands.ts.
 * Falls back to a styled placeholder SVG if the primary download fails.
 * Idempotent: skips files that already exist.
 *
 * Usage: npm run download-logos
 */
import https from 'node:https';
import http  from 'node:http';
import fs    from 'node:fs';
import path  from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR   = path.join(__dirname, '..', 'public', 'assets', 'logos');

// Brand ID → primary simple-icons slug (may differ from the id used in the app)
// simple-icons slugs: all lowercase, no spaces/hyphens/apostrophes
const SLUGS = {
  toyota:       'toyota',
  bmw:          'bmw',
  mercedesbenz: 'mercedesbenz',
  volkswagen:   'volkswagen',
  ford:         'ford',
  audi:         'audi',
  ferrari:      'ferrari',
  lamborghini:  'lamborghini',
  porsche:      'porsche',
  honda:        'honda',
  tesla:        'tesla',
  fiat:         'fiat',
  renault:      'renault',
  hyundai:      'hyundai',
  volvo:        'volvo',
  nissan:       'nissan',
  mazda:        'mazda',
  kia:          'kia',
  peugeot:      'peugeot',
  citroen:      'citroen',
  mini:         'mini',
  alfaromeo:    'alfaromeo',
  maserati:     'maserati',
  jeep:         'jeep',
  chevrolet:    'chevrolet',
  landrover:    'landrover',
  bentley:      'bentley',
  rollsroyce:   'rollsroyce',
  subaru:       'subaru',
  mitsubishi:   'mitsubishi',
  dodge:        'dodge',
  cadillac:     'cadillac',
  bugatti:      'bugatti',
  seat:         'seat',
  skoda:        'skoda',
  opel:         'opel',
  acura:        'acura',
  lexus:        'lexus',
  infiniti:     'infiniti',
  genesis:      'genesis',
  suzuki:       'suzuki',
  jaguar:       'jaguar',
  astonmartin:  'astonmartin',
  buick:        'buick',
  // ── New brands ──────────────────────────────────────────────────
  dacia:          'dacia',
  lancia:         'lancia',
  mg:             'mg',
  byd:            'byd',
  haval:          'haval',
  rivian:         'rivian',
  pagani:         'pagani',
  mclaren:        'mclaren',
  koenigsegg:     'koenigsegg',
  lynkco:         'lynkco',
  sssangyong:     'ssangyong',
  ducati:         'ducati',
  harleydavidson: 'harleydavidson',
  vespa:          'vespa',
  piaggio:        'piaggio',
  yamaha:         'yamaha',
  kawasaki:       'kawasaki',
  triumph:        'triumph',
  aprilia:        'aprilia',
  ktm:            'ktm',
  royalenfield:   'royalenfield',
};

// Brand display names for placeholder SVG fallback
const NAMES = {
  toyota:'Toyota', bmw:'BMW', mercedesbenz:'Mercedes', volkswagen:'VW',
  ford:'Ford', audi:'Audi', ferrari:'Ferrari', lamborghini:'Lamborghini',
  porsche:'Porsche', honda:'Honda', tesla:'Tesla', fiat:'Fiat',
  renault:'Renault', hyundai:'Hyundai', volvo:'Volvo', nissan:'Nissan',
  mazda:'Mazda', kia:'Kia', peugeot:'Peugeot', citroen:'Citroën',
  mini:'Mini', alfaromeo:'AR', maserati:'Maserati', jeep:'Jeep',
  chevrolet:'Chevy', landrover:'LR', bentley:'Bentley', rollsroyce:'RR',
  subaru:'Subaru', mitsubishi:'Mits.', dodge:'Dodge', cadillac:'Cadillac',
  bugatti:'Bugatti', seat:'SEAT', skoda:'Škoda', opel:'Opel',
  acura:'Acura', lexus:'Lexus', infiniti:'Infiniti', genesis:'Genesis',
  suzuki:'Suzuki', jaguar:'Jaguar', astonmartin:'AM', buick:'Buick',
  dacia:'Dacia', lancia:'Lancia', mg:'MG', byd:'BYD', haval:'Haval',
  rivian:'Rivian', pagani:'Pagani', mclaren:'McLaren', koenigsegg:'Kgsegg',
  lynkco:'Lynk&Co', sssangyong:'SsangYng', ducati:'Ducati',
  harleydavidson:'Harley', vespa:'Vespa', piaggio:'Piaggio',
  yamaha:'Yamaha', kawasaki:'Kawasaki', triumph:'Triumph', aprilia:'Aprilia',
  ktm:'KTM', royalenfield:'Royal E',
};

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function createPlaceholderSvg(id) {
  const label = (NAMES[id] || id).substring(0, 5);
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <rect width="120" height="120" rx="20" fill="#e0f2fe"/>
  <text x="60" y="60" dominant-baseline="middle" text-anchor="middle"
        font-family="system-ui,sans-serif" font-weight="900"
        font-size="${label.length > 3 ? '16' : '22'}" fill="#0284c7">${label}</text>
</svg>`;
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'guess-brand-downloader/1.0' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        resolve(fetchUrl(res.headers.location));
        return;
      }
      if (res.statusCode !== 200) { reject(new Error(`HTTP ${res.statusCode}`)); return; }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}

async function downloadLogo(id) {
  const dest = path.join(OUT_DIR, `${id}.svg`);
  if (fs.existsSync(dest)) return 'skip';

  const slug = SLUGS[id] || id;
  // Try simple-icons CDN
  const url = `https://cdn.simpleicons.org/${slug}`;
  try {
    const svg = await fetchUrl(url);
    if (svg.includes('<svg')) {
      fs.writeFileSync(dest, svg, 'utf8');
      return 'ok';
    }
  } catch { /* fall through to placeholder */ }

  // Fallback: styled placeholder SVG
  fs.writeFileSync(dest, createPlaceholderSvg(id), 'utf8');
  return 'placeholder';
}

const IDS = Object.keys(SLUGS);
console.log(`Downloading ${IDS.length} brand logos to ${OUT_DIR} ...\n`);

let ok = 0, skipped = 0, placeholders = 0;
const BATCH = 6;
for (let i = 0; i < IDS.length; i += BATCH) {
  const batch = IDS.slice(i, i + BATCH);
  const results = await Promise.all(batch.map(downloadLogo));
  results.forEach(r => { if (r === 'ok') ok++; else if (r === 'skip') skipped++; else placeholders++; });
  process.stdout.write(`\r  ${i + batch.length}/${IDS.length} processed`);
}

console.log(`\n\nDone!  Downloaded: ${ok}  Skipped: ${skipped}  Placeholders: ${placeholders}`);
if (placeholders > 0) {
  console.log(`\nTip: Placeholder SVGs were created for logos not found on simple-icons.`);
  console.log(`You can replace them manually in public/assets/logos/.`);
}
