import fs from 'node:fs';
import path from 'node:path';

const SLUG = {
  Poppins: 'poppins',
  Playfair: 'playfair-display',
  Space: 'space-grotesk',
  Bebas: 'bebas-neue',
  DMSerif: 'dm-serif-display',
  Inter: 'inter',
  Syne: 'syne',
};

const file = (slug, subset, w, style) =>
  path.resolve(`node_modules/@fontsource/${slug}/files/${slug}-${subset}-${w}-${style}.woff2`);

/** Faqat presetga kerak bo'lgan shriftlarni HTML ichiga base64 qilib joylaydi. */
export function fontCss(specs) {
  const out = [];
  for (const [family, weight, style = 'normal'] of specs) {
    const slug = SLUG[family];
    if (!slug) throw new Error('Shrift topilmadi: ' + family);
    for (const subset of ['latin', 'latin-ext']) {
      const f = file(slug, subset, weight, style);
      if (!fs.existsSync(f)) continue;
      const b64 = fs.readFileSync(f).toString('base64');
      out.push(`@font-face{font-family:'${family}';font-weight:${weight};font-style:${style};` +
        `font-display:block;src:url(data:font/woff2;base64,${b64}) format('woff2');}`);
    }
  }
  return out.join('\n');
}
