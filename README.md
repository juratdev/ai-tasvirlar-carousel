# ai-tasvirlar-carousel

Instagram karusel slaydlarini HTML/CSS dan JPEG ga render qiluvchi servis.

## Ishlash tartibi

```
Cloudflare Worker  --repository_dispatch-->  GitHub Actions
                                                  |
                                            Playwright render
                                                  |
                                            docs/p/<slug>/NN.jpg
                                                  |
                                            GitHub Pages (ochiq URL)
                                                  |
                   <--------- callback ----------- 
                   |
            Instagram Graph API (karusel publish)
```

## Sozlash

1. Repo **Public** bo'lsin (GitHub Pages bepul ishlashi uchun).
2. `Settings → Pages → Source: Deploy from a branch → main / docs`
3. `Settings → Secrets and variables → Actions` ga 2 ta secret qo'shing:
   - `WORKER_CALLBACK_URL` — masalan `https://<worker>.workers.dev/api/render-callback`
   - `CALLBACK_SECRET` — tasodifiy uzun satr (Worker'da ham xuddi shu qiymat)

## Lokal sinov

```bash
npm install
npx playwright install chromium
node src/render.mjs content/sample.json out/test
```

## Presetlar

`src/presets.mjs` — `mono`, `glow`, `grid`, `paper`, `brutal`, `mesh`.
Preset **post darajasida** tanlanadi: bitta postning barcha slaydlari bir xil dizaynda.
