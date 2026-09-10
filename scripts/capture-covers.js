/* eslint-disable @typescript-eslint/no-var-requires */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.resolve(__dirname, '../public/images/covers');

// Verifica se temos uma página viva para tirar screenshot.
// Só captura os que têm URL pública. (react-login-page não tem homepage)
const TARGETS = [
  { slug: 'feed-newsapi', url: 'https://feed-newsapi.vercel.app' },
  { slug: 'users-register-app', url: 'https://users-register-app.vercel.app/' },
  { slug: 'just-ask', url: 'https://justask-ae05a.web.app/' },
  { slug: 'giphy-app', url: 'https://giphy-app-rho.vercel.app/' },
  { slug: 'pokedex', url: 'https://mv-pokedex.vercel.app/' },
  { slug: 'quote-generator-react', url: 'https://quote-generator-mv.vercel.app/' },
];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  for (const target of TARGETS) {
    const out = path.join(OUT_DIR, `${target.slug}.jpg`);
    if (fs.existsSync(out)) {
      console.log(`✓ já existe: ${target.slug}`);
      continue;
    }
    try {
      console.log(`Capturando ${target.slug} ...`);
      await page.goto(target.url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(2500);
      await page.screenshot({ path: out, type: 'jpeg', quality: 72 });
      console.log(`✓ salvo: ${target.slug}`);
    } catch (e) {
      console.error(`✗ falhou ${target.slug}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('Concluído.');
}

main();
