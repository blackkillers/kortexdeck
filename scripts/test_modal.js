import puppeteer from 'puppeteer';

async function testGateway() {
  const browser = await puppeteer.launch({ 
    headless: 'new', 
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push('CONSOLE ERROR: ' + msg.text());
    }
  });
  page.on('pageerror', err => {
    errors.push('PAGE ERROR: ' + err.toString());
  });

  console.log('Loading live site https://cohenwebstudio.com/kortexdeck/ ...');
  await page.goto('https://cohenwebstudio.com/kortexdeck/', { waitUntil: 'networkidle2' });

  // Take screenshot before click
  await page.screenshot({ path: '/tmp/before_click.png' });

  // Click on AI Gateway button
  const clicked = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent && b.textContent.includes('AI Gateway'));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });

  console.log('Clicked AI Gateway button:', clicked);
  await new Promise(r => setTimeout(r, 1200));

  // Take screenshot after click
  await page.screenshot({ path: '/tmp/after_click.png' });

  console.log('Captured Page Errors:', errors);

  const bodyContent = await page.evaluate(() => document.body.innerText);
  console.log('Snippet of modal text present:', bodyContent.slice(0, 300));

  await browser.close();
}

testGateway().catch(err => {
  console.error('Puppeteer test failed:', err);
  process.exit(1);
});
