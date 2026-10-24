// Save a source as a PDF. Usage: node save_copy.js <url> <out.pdf>
// A PDF URL is downloaded as-is; a web page is printed to PDF with a header line naming the URL and date.
const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const [url, out] = process.argv.slice(2);
  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell', proxy });
  const ctx = await b.newContext({ ignoreHTTPSErrors: false, acceptDownloads: true });
  const r = await ctx.request.get(url, { timeout: 60000, maxRedirects: 10 });
  const ct = (r.headers()['content-type'] || '').toLowerCase();
  if (!r.ok()) { console.log('HTTP', r.status()); process.exit(2); }
  if (ct.includes('pdf') || url.toLowerCase().split('?')[0].endsWith('.pdf')) { fs.writeFileSync(out, await r.body()); console.log('pdf', fs.statSync(out).size); }
  else { const p = await ctx.newPage(); await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
    await p.pdf({ path: out, format: 'Letter', printBackground: true, displayHeaderFooter: true,
      headerTemplate: `<div style="font-size:7px;width:100%;padding:0 10mm">${url.replace(/[<>&]/g, '')} · saved ${new Date().toISOString().slice(0, 10)}</div>`, footerTemplate: '<div style="font-size:7px;width:100%;text-align:right;padding:0 10mm"><span class="pageNumber"></span>/<span class="totalPages"></span></div>', margin: { top: '14mm', bottom: '12mm', left: '10mm', right: '10mm' } });
    console.log('page', fs.statSync(out).size); }
  await b.close();
})().catch(e => { console.log('ERR', e.message.slice(0, 200)); process.exit(1); });
