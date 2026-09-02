import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { buildHtml } from './build.mjs';

const W = 1080, H = 1350;              // Instagram 4:5
const QUALITY = 92;                     // JPEG sifati

export async function renderPost(post, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const html = buildHtml(post);
  fs.writeFileSync(path.join(outDir, '_preview.html'), html);

  const browser = await chromium.launch({
    executablePath: process.env.PW_CHROMIUM || undefined,
    args: ['--font-render-hinting=none', '--force-color-profile=srgb'],
  });
  const page = await browser.newPage({
    viewport: { width: W, height: H },
    deviceScaleFactor: 1,
  });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  /* Avto-fit: sarlavha gorizontal chiqib ketmasin, kontent vertikal sig'sin.
     Bu shrift kengligi (Syne, Bebas...) va matn uzunligidan qat'i nazar ishlaydi. */
  await page.evaluate(() => {
    const px = (el) => parseFloat(getComputedStyle(el).fontSize);
    document.querySelectorAll('.slide').forEach((slide) => {
      slide.querySelectorAll('h1,h2,.stat,.card-v').forEach((el) => {
        let size = px(el), guard = 0;
        while (el.scrollWidth > el.clientWidth + 1 && size > 34 && guard++ < 60) {
          size -= 2; el.style.fontSize = size + 'px';
        }
      });
      const c = slide.querySelector('.content');
      let guard = 0;
      while (c.scrollHeight > c.clientHeight + 1 && guard++ < 40) {
        c.querySelectorAll('h1,h2,.body,.serif,.list b,.list i,.note,.stat,.stat-label')
          .forEach((el) => { el.style.fontSize = (px(el) * 0.96) + 'px'; });
      }
    });
  });

  const files = [];
  const nodes = await page.$$('.slide');
  for (let i = 0; i < nodes.length; i++) {
    const file = path.join(outDir, `${String(i + 1).padStart(2, '0')}.jpg`);
    await nodes[i].screenshot({ path: file, type: 'jpeg', quality: QUALITY });
    files.push(file);
  }
  await browser.close();
  return files;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const src = process.argv[2] || 'content/sample.json';
  const out = process.argv[3] || 'out';
  const post = JSON.parse(fs.readFileSync(src, 'utf8'));
  const files = await renderPost(post, out);
  console.log(`${files.length} ta slayd render qilindi:\n` + files.join('\n'));
}
