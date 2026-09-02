/**
 * Dizayn presetlari — har post uchun bittasi tanlanadi.
 * Doimiy qoladigan narsalar (brend izchilligi uchun):
 *   1080x1350 format, logotip joyi, dot-indikator, kontent tuzilmasi.
 * O'zgaradiganlar: rang, fon teksturasi, tipografika, hizalash, dekorativ elementlar.
 */
export const PRESETS = {
  /* 1. Studio Mono — logotipga eng mos, klassik */
  mono: {
    label: 'Studio Mono',
    fonts: [['Poppins', 400], ['Poppins', 600], ['Poppins', 700], ['Poppins', 800], ['Playfair', 400, 'italic']],
    head: { family: 'Poppins', weight: 800, spacing: '-2px', transform: 'none', lh: 1.07 },
    body: 'Poppins', serif: 'Playfair',
    bg: '#080808', fg: '#FFFFFF', muted: 'rgba(255,255,255,.60)',
    accent: '#FFFFFF', onAccent: '#080808', line: 'rgba(255,255,255,.14)',
    surface: 'rgba(255,255,255,.05)',
    texture: `radial-gradient(900px 700px at 12% -10%, rgba(255,255,255,.10), transparent 62%),
      radial-gradient(700px 600px at 108% 108%, rgba(255,255,255,.05), transparent 60%),
      repeating-linear-gradient(115deg, rgba(255,255,255,.028) 0 1px, transparent 1px 190px)`,
    align: 'left', ghost: false,
  },

  /* 2. Neon Glow — markazlashgan, yorqin akssent */
  glow: {
    label: 'Neon Glow',
    fonts: [['Space', 400], ['Space', 500], ['Space', 700], ['Playfair', 400, 'italic']],
    head: { family: 'Space', weight: 700, spacing: '-2.5px', transform: 'none', lh: 1.05 },
    body: 'Space', serif: 'Playfair',
    bg: '#050A10', fg: '#FFFFFF', muted: 'rgba(210,235,255,.62)',
    accent: '#3DE3B4', onAccent: '#04140F', line: 'rgba(61,227,180,.22)',
    surface: 'rgba(61,227,180,.07)',
    texture: `radial-gradient(760px 620px at 50% 24%, rgba(61,227,180,.20), transparent 66%),
      radial-gradient(900px 700px at 92% 104%, rgba(56,120,255,.16), transparent 62%),
      radial-gradient(600px 500px at 4% 92%, rgba(61,227,180,.08), transparent 60%)`,
    align: 'center', ghost: false,
  },

  /* 3. Blueprint — panjara fon, orqa fonda ulkan raqam */
  grid: {
    label: 'Blueprint',
    fonts: [['Syne', 700], ['Syne', 800], ['Inter', 400], ['Inter', 600], ['Inter', 700], ['Playfair', 400, 'italic']],
    head: { family: 'Syne', weight: 800, spacing: '-1.5px', transform: 'none', lh: 1.06 },
    body: 'Inter', serif: 'Playfair',
    bg: '#0A0A14', fg: '#FFFFFF', muted: 'rgba(226,222,255,.60)',
    accent: '#A78BFA', onAccent: '#120B22', line: 'rgba(167,139,250,.24)',
    surface: 'rgba(167,139,250,.08)',
    texture: `linear-gradient(rgba(167,139,250,.07) 1px, transparent 1px) 0 0/90px 90px,
      linear-gradient(90deg, rgba(167,139,250,.07) 1px, transparent 1px) 0 0/90px 90px,
      radial-gradient(800px 640px at 88% -6%, rgba(167,139,250,.20), transparent 62%)`,
    align: 'left', ghost: true,
  },

  /* 4. Light Paper — lentada kuchli kontrast beradi */
  paper: {
    label: 'Light Paper',
    fonts: [['DMSerif', 400], ['Inter', 400], ['Inter', 500], ['Inter', 600], ['Inter', 700], ['DMSerif', 400, 'italic']],
    head: { family: 'DMSerif', weight: 400, spacing: '-1px', transform: 'none', lh: 1.08 },
    body: 'Inter', serif: 'DMSerif',
    bg: '#F2EFE8', fg: '#14120F', muted: 'rgba(20,18,15,.62)',
    accent: '#14120F', onAccent: '#F2EFE8', line: 'rgba(20,18,15,.16)',
    surface: 'rgba(20,18,15,.05)',
    texture: `radial-gradient(820px 660px at 96% -8%, rgba(203,132,45,.20), transparent 62%),
      radial-gradient(700px 600px at -8% 104%, rgba(20,18,15,.07), transparent 60%)`,
    align: 'left', ghost: false,
  },

  /* 5. Brutal Poster — ulkan siqiq sarlavha, plakat uslubi */
  brutal: {
    label: 'Brutal Poster',
    fonts: [['Bebas', 400], ['Inter', 400], ['Inter', 600], ['Inter', 700], ['Playfair', 400, 'italic']],
    head: { family: 'Bebas', weight: 400, spacing: '1px', transform: 'uppercase', lh: 0.94, scale: 1.35 },
    body: 'Inter', serif: 'Playfair',
    bg: '#0D0D0D', fg: '#FFFFFF', muted: 'rgba(255,255,255,.58)',
    accent: '#F5C518', onAccent: '#0D0D0D', line: 'rgba(245,197,24,.28)',
    surface: 'rgba(245,197,24,.09)',
    texture: `linear-gradient(180deg, rgba(245,197,24,.14), transparent 42%),
      repeating-linear-gradient(90deg, rgba(255,255,255,.035) 0 2px, transparent 2px 24px)`,
    align: 'left', ghost: true,
  },

  /* 6. Gradient Mesh — chuqur gradient, shishasimon kartalar */
  mesh: {
    label: 'Gradient Mesh',
    fonts: [['Poppins', 400], ['Poppins', 600], ['Poppins', 700], ['Playfair', 400, 'italic']],
    head: { family: 'Poppins', weight: 700, spacing: '-2px', transform: 'none', lh: 1.07 },
    body: 'Poppins', serif: 'Playfair',
    bg: '#0B0720', fg: '#FFFFFF', muted: 'rgba(228,222,255,.66)',
    accent: '#8B7CFF', onAccent: '#0B0720', line: 'rgba(255,255,255,.18)',
    surface: 'rgba(255,255,255,.08)',
    texture: `radial-gradient(760px 640px at 8% 6%, rgba(139,124,255,.42), transparent 60%),
      radial-gradient(700px 620px at 96% 34%, rgba(255,94,160,.26), transparent 58%),
      radial-gradient(820px 700px at 46% 112%, rgba(56,182,255,.28), transparent 60%)`,
    align: 'center', ghost: false,
  },
};

export const PRESET_KEYS = Object.keys(PRESETS);

/** Ketma-ket postlar bir xil ko'rinmasligi uchun: oxirgi 2 ta presetni takrorlamaydi. */
export function pickPreset(recent = []) {
  const pool = PRESET_KEYS.filter((k) => !recent.slice(-2).includes(k));
  return pool[Math.floor(Math.random() * pool.length)];
}
