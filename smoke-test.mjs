import fs from "fs";

const html = fs.readFileSync("index.html", "utf8");
const js = fs.readFileSync("app.js", "utf8");
const css = fs.readFileSync("styles.css", "utf8");

const checks = [];
function ok(name, cond) {
  checks.push({ name, pass: !!cond });
}

ok("has 4 pitch slides", (html.match(/data-slide="/g) || []).length >= 4);
ok("has fee calculator", html.includes('id="fee-range"'));
ok("has ICP section", html.includes("Primary ICP"));
ok("css has global-nav", css.includes(".global-nav"));
ok("css has pitch-slide", css.includes(".pitch-slide"));
ok("js routes home pitch demo submit", /"home", "pitch", "demo", "submit"/.test(js));
ok("js createInvoice", js.includes("function createInvoice"));
ok("js simulatePay", js.includes("function simulatePay"));
ok("no lorem ipsum", !/lorem ipsum/i.test(html));
ok("no TODO/FIXME in html", !/TODO|FIXME/.test(html));
ok("relative styles.css", html.includes('href="styles.css"'));
ok("relative app.js", html.includes('src="app.js"'));
ok("fonts linked", html.includes("fonts.googleapis.com"));

const openSec = (html.match(/<section/g) || []).length;
const closeSec = (html.match(/<\/section>/g) || []).length;
ok("section tags balanced", openSec === closeSec);

const htmlIds = [...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
const jsIds = [...js.matchAll(/\$\("([^"]+)"\)/g)].map((m) => m[1]);
const missing = jsIds.filter((id) => !htmlIds.includes(id));
ok("all JS ids exist in HTML", missing.length === 0);

for (const v of ["home", "pitch", "demo", "submit"]) {
  ok(`view-${v}`, html.includes(`id="view-${v}"`));
}
for (const p of ["dashboard", "create", "pay", "success", "batch"]) {
  ok(`panel-${p}`, html.includes(`id="panel-${p}"`));
}

const fails = checks.filter((c) => !c.pass);
for (const c of checks) {
  console.log(`${c.pass ? "PASS" : "FAIL"} - ${c.name}`);
}
if (missing.length) console.log("Missing IDs:", missing.join(", "));
console.log("---");
console.log(fails.length ? `RESULT: FAIL (${fails.length})` : "RESULT: ALL PASS");
process.exit(fails.length ? 1 : 0);
