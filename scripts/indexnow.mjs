// Tells IndexNow-compatible search engines (Bing, Yandex, Seznam, Naver...) that every page changed.
// Bing's index also feeds ChatGPT search and Copilot. Run after a deploy: npm run indexnow
const host = "aruno.buildc3.tech";
const key = "94448f61d3bad725f972f785c00ee2b1";
const xml = await fetch(`https://${host}/sitemap.xml`).then((r) => r.text());
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (!res.ok && res.status !== 202) process.exit(1);
