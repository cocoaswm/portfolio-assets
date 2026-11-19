var __STATS_ACCT = "83cca4e9d14ee30d0eccf778970e4b9d";
var __STATS_SITE = "5c169b84a0bb4b598774f9e6c3c19edf";
var __STATS_PATHS = ["/portfolio", "/portfolio/", "/portfolio/projects", "/portfolio/projects/", "/portfolio_old", "/portfolio_old/"];
async function __statsHmac(secret, msg) {
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const s = await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(msg));
  return [...new Uint8Array(s)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function __statsEq(a, b) { if (a.length !== b.length) return false; let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i); return r === 0; }
function __statsEsc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function __statsPage(body, extraHead) {
  return new Response(`<!DOCTYPE html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Portfolio stats</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;600;800&family=Nunito:wght@600;800&display=swap" rel="stylesheet">${extraHead || ""}
<style>*{box-sizing:border-box;margin:0}html{background:#0f0c24}body{font-family:Nunito,'Noto Sans Thai',sans-serif;min-height:100vh;color:#eef0ff;background:linear-gradient(160deg,#0f0c24,#1a1033 45%,#0c1430) fixed;padding:1.5rem}
.w{max-width:860px;margin:0 auto}.card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:1.5rem;padding:1.25rem 1.4rem;backdrop-filter:blur(16px);margin-bottom:1rem}
h1{font-size:1.5rem;font-weight:800;margin:.5rem 0 .25rem}.sub{color:#b9bdd8;font-size:.9rem;margin-bottom:1.25rem}
.tabs{display:flex;gap:.5rem;margin-bottom:1rem;flex-wrap:wrap}.tabs a{padding:.45rem 1rem;border-radius:999px;background:rgba(255,255,255,.08);color:#eef0ff;text-decoration:none;font-weight:700;font-size:.85rem}.tabs a.on{background:linear-gradient(90deg,#ec4899,#a855f7,#3b82f6)}
.kpis{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.75rem}.kpi b{display:block;font-size:2rem;font-weight:800;background:linear-gradient(90deg,#f9a8d4,#c4b5fd,#93c5fd);-webkit-background-clip:text;background-clip:text;color:transparent}.kpi span{color:#b9bdd8;font-size:.82rem;font-weight:600}
h2{font-size:1rem;font-weight:800;margin-bottom:.75rem}.row{display:flex;align-items:center;gap:.6rem;margin:.45rem 0;font-size:.88rem}.row .l{width:42%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#d6daea}.row .bar{flex:1;height:.55rem;border-radius:9px;background:rgba(255,255,255,.08);overflow:hidden}.row .bar i{display:block;height:100%;border-radius:9px;background:linear-gradient(90deg,#ec4899,#a855f7,#3b82f6)}.row .n{width:3.2rem;text-align:right;font-weight:800}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:0 1rem}.chart{display:flex;align-items:flex-end;gap:3px;height:140px;padding-top:.5rem}.chart div{flex:1;background:linear-gradient(180deg,#a855f7,#3b82f6);border-radius:4px 4px 0 0;min-height:2px;position:relative}.chart div:hover::after{content:attr(data-t);position:absolute;bottom:100%;left:50%;transform:translateX(-50%);background:#1f1b3a;padding:.2rem .45rem;border-radius:6px;font-size:.72rem;white-space:nowrap}
.axis{display:flex;justify-content:space-between;color:#8d92b0;font-size:.72rem;margin-top:.35rem}.note{color:#9aa0be;font-size:.78rem;line-height:1.6}
form{display:flex;flex-direction:column;gap:.75rem;max-width:320px;margin:18vh auto 0}input{padding:.8rem 1rem;border-radius:1rem;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.08);color:#fff;font:inherit}button{padding:.8rem;border:0;border-radius:1rem;font:inherit;font-weight:800;color:#fff;background:linear-gradient(90deg,#ec4899,#a855f7,#3b82f6);cursor:pointer}.err{color:#fca5a5;font-size:.85rem}
.top{display:flex;justify-content:space-between;align-items:center}.top a{color:#c4b5fd;font-size:.85rem;font-weight:700}
@media(max-width:640px){.grid{grid-template-columns:1fr}.kpi b{font-size:1.5rem}}</style></head><body><div class="w">${body}</div></body></html>`,
    { headers: { "content-type": "text/html; charset=UTF-8", "cache-control": "no-store", "x-robots-tag": "noindex, nofollow", "referrer-policy": "no-referrer" } });
}
function __statsLogin(msg) {
  return __statsPage(`<form method="post" action="/portfolio/stats"><h1>ยอดเข้าชมพอร์ต</h1><p class="sub">ใส่รหัสผ่านเพื่อดูสถิติ</p>${msg ? `<p class="err">${__statsEsc(msg)}</p>` : ""}<input type="password" name="password" autocomplete="current-password" placeholder="รหัสผ่าน" required autofocus><button type="submit">เข้าสู่ระบบ</button></form>`);
}
function __statsRows(items, key, label) {
  const max = Math.max(1, ...items.map((x) => x.count));
  if (!items.length) return `<p class="note">ยังไม่มีข้อมูล</p>`;
  return items.map((x) => `<div class="row"><span class="l">${__statsEsc(label(x.dimensions[key]))}</span><span class="bar"><i style="width:${Math.round((x.count / max) * 100)}%"></i></span><span class="n">${x.count}</span></div>`).join("");
}
async function __statsHandle(request, env) {
  const url = new URL(request.url);
  if (!env.STATS_PASSWORD || !env.CF_API_TOKEN) return __statsPage(`<div class="card" style="margin-top:18vh"><h1>ยังไม่ได้ตั้งค่า</h1><p class="note">เพิ่ม Secret ชื่อ CF_API_TOKEN และ STATS_PASSWORD ใน Worker portfolio-pages ก่อน</p></div>`);
  const sig = await __statsHmac(env.STATS_PASSWORD, "portfolio-stats-v1");
  const cookie = (request.headers.get("cookie") || "").split(/;\s*/).find((c) => c.startsWith("pstats=")) || "";
  const authed = cookie && __statsEq(cookie.slice(7), sig);
  if (url.searchParams.get("logout") === "1") return new Response(null, { status: 303, headers: { location: "/portfolio/stats", "set-cookie": "pstats=; Path=/portfolio/stats; Max-Age=0; HttpOnly; Secure; SameSite=Strict" } });
  if (request.method === "POST") {
    const form = await request.formData();
    const pw = String(form.get("password") || "");
    if (__statsEq(pw, env.STATS_PASSWORD)) return new Response(null, { status: 303, headers: { location: "/portfolio/stats", "set-cookie": `pstats=${sig}; Path=/portfolio/stats; Max-Age=2592000; HttpOnly; Secure; SameSite=Strict` } });
    await new Promise((r) => setTimeout(r, 800));
    return __statsLogin("รหัสผ่านไม่ถูกต้อง");
  }
  if (!authed) return __statsLogin("");
  const days = [1, 7, 30].includes(Number(url.searchParams.get("d"))) ? Number(url.searchParams.get("d")) : 7;
  const since = new Date(Date.now() - days * 864e5).toISOString();
  const filter = { AND: [{ siteTag: __STATS_SITE }, { datetime_geq: since }, { OR: __STATS_PATHS.map((p) => ({ requestPath: p })) }] };
  const q = `query($a:String!,$f:AccountRumPageloadEventsAdaptiveGroupsFilter_InputObject){viewer{accounts(filter:{accountTag:$a}){
    total:rumPageloadEventsAdaptiveGroups(limit:1,filter:$f){count sum{visits}}
    byDay:rumPageloadEventsAdaptiveGroups(limit:400,filter:$f,orderBy:[${days === 1 ? "datetimeHour_ASC" : "date_ASC"}]){count sum{visits} dimensions{${days === 1 ? "datetimeHour" : "date"}}}
    byPath:rumPageloadEventsAdaptiveGroups(limit:10,filter:$f,orderBy:[count_DESC]){count dimensions{requestPath}}
    byRef:rumPageloadEventsAdaptiveGroups(limit:10,filter:$f,orderBy:[count_DESC]){count dimensions{refererHost}}
    byDevice:rumPageloadEventsAdaptiveGroups(limit:5,filter:$f,orderBy:[count_DESC]){count dimensions{deviceType}}
    byCountry:rumPageloadEventsAdaptiveGroups(limit:8,filter:$f,orderBy:[count_DESC]){count dimensions{countryName}}
  }}}`;
  let data;
  try {
    const r = await fetch("https://api.cloudflare.com/client/v4/graphql", { method: "POST", headers: { authorization: `Bearer ${env.CF_API_TOKEN}`, "content-type": "application/json" }, body: JSON.stringify({ query: q, variables: { a: __STATS_ACCT, f: filter } }) });
    const j = await r.json();
    if (j.errors && j.errors.length) throw new Error(j.errors.map((e) => e.message).join("; "));
    data = j.data.viewer.accounts[0];
  } catch (e) {
    return __statsPage(`<div class="card"><h1>ดึงข้อมูลไม่สำเร็จ</h1><p class="note">${__statsEsc(e.message || e)}</p><p class="note">ตรวจว่า Token มีสิทธิ์ Account Analytics: Read</p></div>`);
  }
  const tot = data.total[0] || { count: 0, sum: { visits: 0 } };
  const merged = {};
  for (const x of data.byPath) { const k = x.dimensions.requestPath.replace(/\/+$/, "") || "/"; merged[k] = (merged[k] || 0) + x.count; }
  const paths = Object.entries(merged).sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ count: v, dimensions: { requestPath: k } }));
  const series = data.byDay; const maxD = Math.max(1, ...series.map((x) => x.count));
  const lab = (x) => days === 1 ? new Date(x.dimensions.datetimeHour).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Bangkok" }) : new Date(x.dimensions.date + "T00:00:00Z").toLocaleDateString("th-TH", { day: "numeric", month: "short", timeZone: "UTC" });
  const chart = series.length ? `<div class="chart">${series.map((x) => `<div style="height:${Math.round((x.count / maxD) * 100)}%" data-t="${__statsEsc(lab(x))}: ${x.count}"></div>`).join("")}</div><div class="axis"><span>${__statsEsc(lab(series[0]))}</span><span>${__statsEsc(lab(series[series.length - 1]))}</span></div>` : `<p class="note">ยังไม่มีข้อมูลในช่วงนี้</p>`;
  const pathName = (p) => ({ "/portfolio": "หน้าพอร์ตหลัก", "/portfolio/projects": "หน้าผลงานทั้งหมด", "/portfolio_old": "พอร์ตเก่า" }[p] || p);
  const refName = (h) => h ? h.replace(/^(www\.|lm\.|l\.|m\.)/, "") : "เข้าตรง / แอปแชต / อีเมล";
  const devName = (d) => ({ mobile: "มือถือ", desktop: "คอมพิวเตอร์", tablet: "แท็บเล็ต" }[d] || d || "ไม่ทราบ");
  const rm = {}; for (const x of data.byRef) { const k = refName(x.dimensions.refererHost); rm[k] = (rm[k] || 0) + x.count; }
  const refs = Object.entries(rm).sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ count: v, dimensions: { refererHost: k } }));
  const tab = (d, t) => `<a class="${d === days ? "on" : ""}" href="?d=${d}">${t}</a>`;
  const now = new Date().toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Bangkok" });
  return __statsPage(`<div class="top"><h1>ยอดเข้าชมพอร์ต</h1><a href="?logout=1">ออกจากระบบ</a></div><p class="sub">chewvy.shop/portfolio · อัปเดต ${__statsEsc(now)}</p>
<div class="tabs">${tab(1, "24 ชั่วโมง")}${tab(7, "7 วัน")}${tab(30, "30 วัน")}</div>
<div class="card kpis"><div class="kpi"><b>${tot.sum.visits}</b><span>การเข้าชม (visits)</span></div><div class="kpi"><b>${tot.count}</b><span>ครั้งที่เปิดหน้า</span></div><div class="kpi"><b>${(merged["/portfolio/projects"] || 0)}</b><span>เปิดหน้าผลงานทั้งหมด</span></div></div>
<div class="card"><h2>${days === 1 ? "รายชั่วโมง" : "รายวัน"} (ครั้งที่เปิดหน้า)</h2>${chart}</div>
<div class="grid"><div class="card"><h2>มาจากช่องทางไหน</h2>${__statsRows(refs, "refererHost", (x) => x)}</div><div class="card"><h2>หน้าที่เปิด</h2>${__statsRows(paths, "requestPath", pathName)}</div>
<div class="card"><h2>อุปกรณ์</h2>${__statsRows(data.byDevice, "deviceType", devName)}</div><div class="card"><h2>ประเทศ</h2>${__statsRows(data.byCountry, "countryName", (c) => c || "ไม่ทราบ")}</div></div>
<p class="note">ตัวเลขเป็นค่าประมาณจากการเก็บตัวอย่างของ Cloudflare Web Analytics และนับรวมการเข้าชมของเจ้าของเว็บเองด้วย</p>`);
}
