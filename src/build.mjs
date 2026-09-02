import { fontCss } from './theme.mjs';
import { PRESETS } from './presets.mjs';

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Sarlavha uzunligiga qarab shrift o'lchami — matn hech qachon slaydga sig'may qolmaydi */
const titleSize = (t = '', scale = 1) => {
  const n = String(t).length;
  const base = n <= 20 ? 100 : n <= 32 ? 88 : n <= 48 ? 76 : n <= 70 ? 64 : 56;
  return Math.round(base * scale);
};

const logo = () => `
  <div class="logo">
    <div class="logo-box">AI TASVIRLAR</div>
    <div class="logo-sub">ONLINE<br>STUDIO</div>
  </div>`;

const dots = (i, total) => `
  <div class="dots">${Array.from({ length: total }, (_, k) =>
    `<span class="${k === i ? 'on' : ''}"></span>`).join('')}</div>`;

const badge = (t) => t ? `<div class="badge">${esc(t)}</div>` : '';

function slideBody(s, P) {
  const sc = P.head.scale || 1;
  switch (s.type) {
    case 'cover':
      return `
        ${badge(s.badge)}
        <h1 style="font-size:${titleSize(s.title, sc)}px">${esc(s.title)}</h1>
        <div class="rule"></div>
        ${s.subtitle ? `<p class="serif">${esc(s.subtitle)}</p>` : ''}
        <div class="spacer"></div>
        ${s.cta ? `<div class="pill">${esc(s.cta)}<span class="arrow">&#8594;</span></div>` : ''}`;

    case 'step':
      return `
        <div class="head">
          <div class="num">${esc(s.n)}</div>
          <h2 style="font-size:${Math.round(Math.min(72, titleSize(s.title)) * sc)}px">${esc(s.title)}</h2>
        </div>
        <div class="ba">
          <div class="tag warn">${esc(s.before.label || 'OLDIN')}</div>
          <p class="serif sm">${esc(s.before.text)}</p>
          <div class="hr"></div>
          <div class="tag good">${esc(s.after.label || 'KEYIN')}</div>
          <p class="body">${esc(s.after.text)}</p>
        </div>
        <div class="spacer"></div>`;

    case 'tip':
      return `
        <div class="head">
          <div class="num">${esc(s.n)}</div>
          <h2 style="font-size:${Math.round(Math.min(72, titleSize(s.title)) * sc)}px">${esc(s.title)}</h2>
        </div>
        <p class="body lg">${esc(s.body)}</p>
        ${s.note ? `<div class="note">${esc(s.note)}</div>` : ''}
        <div class="spacer"></div>`;

    case 'list':
      return `
        ${badge(s.badge)}
        <h2 style="font-size:${Math.round(Math.min(80, titleSize(s.title)) * sc)}px">${esc(s.title)}</h2>
        <div class="rule"></div>
        <ul class="list">
          ${s.items.map((it) => `<li><span class="mk"></span><div>
            <b>${esc(it.k)}</b>${it.v ? `<i>${esc(it.v)}</i>` : ''}</div></li>`).join('')}
        </ul>
        <div class="spacer"></div>`;

    case 'stat':
      return `
        ${badge(s.badge)}
        <div class="spacer"></div>
        <div class="stat">${esc(s.value)}</div>
        <div class="stat-label">${esc(s.label)}</div>
        <div class="rule"></div>
        ${s.body ? `<p class="body">${esc(s.body)}</p>` : ''}
        <div class="spacer"></div>`;

    case 'cta':
      return `
        ${badge(s.badge)}
        <h1 style="font-size:${Math.round(Math.min(84, titleSize(s.title)) * sc)}px">${esc(s.title)}</h1>
        <div class="rule"></div>
        ${s.subtitle ? `<p class="serif">${esc(s.subtitle)}</p>` : ''}
        <div class="spacer"></div>
        <div class="card">
          <div>
            <div class="card-k">${esc(s.contact.label)}</div>
            <div class="card-v">${esc(s.contact.value)}</div>
          </div>
          <div class="card-ic">${esc(s.contact.icon || '→')}</div>
        </div>
        ${s.footer ? `<div class="foot">${esc(s.footer)}</div>` : ''}`;

    default:
      throw new Error("Noma'lum slayd turi: " + s.type);
  }
}

export function buildHtml(post) {
  const P = PRESETS[post.preset] || PRESETS.mono;
  const total = post.slides.length;
  const centered = P.align === 'center';

  const slides = post.slides.map((s, i) => `
    <section class="slide ${s.type}" data-i="${i}">
      <div class="bg"></div>
      ${P.ghost && s.n ? `<div class="ghost">${esc(s.n)}</div>` : ''}
      ${logo()}
      <div class="content">${slideBody(s, P)}</div>
      ${dots(i, total)}
    </section>`).join('');

  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
${fontCss(P.fonts)}
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;-webkit-font-smoothing:antialiased}
:root{
  --bg:${P.bg}; --fg:${P.fg}; --muted:${P.muted}; --a:${P.accent};
  --on-a:${P.onAccent}; --line:${P.line}; --surface:${P.surface};
}
.slide{position:relative;width:1080px;height:1350px;overflow:hidden;
  background:var(--bg);color:var(--fg);display:flex;flex-direction:column;
  font-family:'${P.body}',sans-serif}
.bg{position:absolute;inset:0;background:${P.texture.replace(/\s+/g, ' ')}}

.ghost{position:absolute;right:-40px;bottom:-130px;font-family:'${P.head.family}',sans-serif;
  font-weight:${P.head.weight};font-size:620px;line-height:1;color:var(--fg);opacity:.045;z-index:1}

.logo{position:absolute;top:64px;right:72px;z-index:3;display:flex;align-items:center;gap:14px;opacity:.85}
.logo-box{border:3px solid var(--fg);border-radius:4px;padding:8px 16px;font-family:'Poppins',sans-serif;
  font-weight:800;font-size:24px;letter-spacing:.5px;line-height:1}
.logo-sub{font-family:'Poppins',sans-serif;font-size:12px;line-height:1.25;letter-spacing:2.5px;font-weight:600;opacity:.65}

.content{position:relative;z-index:2;flex:1;display:flex;flex-direction:column;
  padding:190px 88px 46px;gap:34px;
  align-items:${centered ? 'center' : 'flex-start'};
  text-align:${centered ? 'center' : 'left'}}
.content>*{max-width:100%}
.spacer{flex:1}
.cover .content,.step .content,.tip .content{padding-top:150px}
.cta .content{padding-top:170px}
.cover .content>.badge{margin-top:auto}

.badge{border:2px solid var(--a);color:var(--a);border-radius:999px;padding:16px 34px;
  font-size:26px;font-weight:700;letter-spacing:3.5px;line-height:1;font-family:'${P.body}',sans-serif}

h1,h2{font-family:'${P.head.family}',sans-serif;font-weight:${P.head.weight};
  line-height:${P.head.lh};letter-spacing:${P.head.spacing};text-transform:${P.head.transform}}
.rule{width:96px;height:6px;border-radius:3px;background:var(--a)}
.serif{font-family:'${P.serif}',serif;font-style:italic;font-size:42px;line-height:1.34;color:var(--muted)}
.serif.sm{font-size:36px}
.body{font-size:40px;line-height:1.45;font-weight:400;color:var(--fg);opacity:.92}
.body.lg{font-size:44px}

.head{display:flex;align-items:center;gap:30px;
  flex-direction:${centered ? 'column' : 'row'}}
.num{flex:none;width:104px;height:104px;border-radius:50%;background:var(--a);color:var(--on-a);
  display:flex;align-items:center;justify-content:center;font-size:54px;font-weight:800;
  font-family:'Poppins',sans-serif}

.ba{display:flex;flex-direction:column;gap:24px;width:100%;
  align-items:${centered ? 'center' : 'flex-start'}}
.tag{border-radius:999px;padding:12px 26px;font-size:24px;font-weight:700;letter-spacing:2.5px;line-height:1}
.tag.warn{border:2px solid rgba(255,138,128,.55);color:#FF9E93}
.tag.good{border:2px solid var(--a);color:var(--a)}
.hr{height:2px;background:var(--line);margin:10px 0;width:100%}

.note{border-left:5px solid var(--a);background:var(--surface);padding:26px 30px;
  border-radius:0 14px 14px 0;font-size:32px;line-height:1.4;color:var(--muted);text-align:left}

.list{list-style:none;display:flex;flex-direction:column;gap:30px;text-align:left;width:100%}
.list li{display:flex;gap:24px;align-items:flex-start}
.mk{flex:none;width:16px;height:16px;border-radius:50%;background:var(--a);margin-top:16px}
.list b{display:block;font-size:40px;font-weight:700;line-height:1.25}
.list i{display:block;font-family:'${P.serif}',serif;font-size:32px;line-height:1.35;color:var(--muted);margin-top:6px}

.stat{font-family:'${P.head.family}',sans-serif;font-size:${Math.round(210 * (P.head.scale || 1))}px;
  font-weight:${P.head.weight};letter-spacing:-8px;line-height:1;color:var(--a)}
.stat-label{font-size:44px;font-weight:600;letter-spacing:-.5px}

.card{border:2px solid var(--a);border-radius:26px;padding:40px 44px;width:100%;
  display:flex;align-items:center;justify-content:space-between;gap:24px;text-align:left;
  background:var(--surface)}
.card-k{font-size:30px;color:var(--muted);margin-bottom:8px}
.card-v{font-size:56px;font-weight:800;letter-spacing:-1px;font-family:'Poppins',sans-serif}
.card-ic{flex:none;width:88px;height:88px;border-radius:50%;background:var(--a);color:var(--on-a);
  display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:800}
.foot{width:100%;text-align:center;font-size:30px;font-weight:600;color:var(--muted);margin-top:26px}

.pill{align-self:center;display:flex;align-items:center;gap:22px;background:var(--a);color:var(--on-a);
  border-radius:999px;padding:26px 46px;font-size:34px;font-weight:800;letter-spacing:1.5px;
  font-family:'Poppins',sans-serif}
.arrow{font-size:38px;line-height:1}

.dots{position:relative;z-index:2;display:flex;gap:14px;justify-content:center;padding:34px 0 72px}
.dots span{width:14px;height:14px;border-radius:50%;background:var(--line)}
.dots span.on{width:42px;border-radius:7px;background:var(--a)}
</style></head><body>${slides}</body></html>`;
}
