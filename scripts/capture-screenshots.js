const puppeteer = require('puppeteer');
const path = require('path');

const SCREENSHOTS = [
  { name: 'homepage', url: 'https://www.antoniolupiusa.com', waitFor: 3000 },
  { name: 'collection', url: 'https://www.antoniolupiusa.com/collections/sinks', waitFor: 2000 },
  { name: 'product', url: 'https://www.antoniolupiusa.com/products/breeze', waitFor: 2000 },
  { name: 'variants', url: 'https://www.antoniolupiusa.com/products/ago', waitFor: 2000 },
];

const OUTPUT_DIR = path.join(__dirname, '../public/assets/projects/ecommerce');

async function captureScreenshots() {
  console.log('Launching browser...');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  for (const shot of SCREENSHOTS) {
    try {
      console.log(`Capturing ${shot.name}...`);
      await page.goto(shot.url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForTimeout(shot.waitFor);

      const outputPath = path.join(OUTPUT_DIR, `${shot.name}.jpg`);
      await page.screenshot({
        path: outputPath,
        type: 'jpeg',
        quality: 90,
        fullPage: false
      });

      console.log(`  Saved: ${outputPath}`);
    } catch (error) {
      console.error(`  Error capturing ${shot.name}:`, error.message);
    }
  }

  await browser.close();
  console.log('Done!');
}

captureScreenshots();
