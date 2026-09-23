# CryptoByte 2026 — statický archiv

Samostatná kopie webu CryptoByte 2026. Obsah, obrázky a fonty jsou uložené v repozitáři. Sestavení ani provoz nepotřebují CMS, API, databázi, přihlašovací údaje ani serverové funkce.

## Lokální spuštění

Vyžaduje Bun 1.3.14, Node.js 22+ a pro náhled Python 3.

```sh
bun install --frozen-lockfile
bun run build
bun run preview
```

Otevři <http://127.0.0.1:4173>. Dashboard je na `/dashboard/`, program na `/program/` a tisková verze na `/print/`. Pro úpravy zdrojových souborů lze použít `bun run dev`.

Po prvním nainstalování závislostí jsou všechna data potřebná pro sestavení lokální. Hotový adresář `.output/public` lze obsluhovat libovolným statickým HTTP serverem i bez přístupu k internetu. Otevírej jej přes HTTP, nikoli dvojklikem na HTML přes `file://`.

## Obsah archivu

Snapshot byl pořízen 22. 9. 2026. Přesný čas a commit původního webu obsahuje `data/manifest.json`.

- 33 stránek včetně 23 kompletních článků, programu, tisku a dashboardu.
- 41 položek programu, 7 stagí, 40 hostů, 26 partnerů, 20 podporovatelů, 12 FAQ a 6 referencí.
- 90 stažených obrázků a 14 souborů fontů; fotografie řečníků zachovávají původní ořez.
- Dashboard obsahuje archivovaných 2 305 srdíček od 277 prohlížečů včetně počtů a časů u jednotlivých přednášek. Neobnovuje se a místní změny oblíbených jeho statistiky nemění.
- Oblíbené přednášky fungují přes `localStorage` pouze v konkrétním prohlížeči.

Sociální sítě, vstupenky, mapy a další externí cíle zůstávají běžnými odkazy. Nejsou součástí archivu. YouTube přehrávač na staré stránce `/index-soon/` je nahrazen odkazem na video, aby nevznikal automatický externí požadavek. Analytika a cookie banner jsou odstraněné. Dva původní odkazy na X zadané jen jako `@jméno` jsou převedené na úplné URL.

## Ověření samostatnosti

Po sestavení spusť `bun run preview` a v druhém terminálu:

```sh
bunx playwright install chromium
bun run test:static
```

Pokud je nainstalovaný Google Chrome, lze instalaci testovacího prohlížeče vynechat:

```sh
PLAYWRIGHT_CHANNEL=chrome bun run test:static
```

Test otevře všech 33 stránek s blokovanými externími požadavky, kontroluje načtení obrázků a chyby prohlížeče, místní oblíbené po obnovení stránky, detail přednášky, přechody mezi články a mobilní zobrazení. Dashboard kontroluje i po uplynutí původního 30sekundového intervalu. Screenshoty ukládá do `test-results/`.

## Automatické nasazení na Cloudflare Pages

Produkční adresa: <https://2026.cryptobyte.cz>, dashboard: <https://2026.cryptobyte.cz/dashboard/>.

Každý push do `main` spustí GitHub Actions workflow `.github/workflows/ci.yml`. Ten nainstaluje závislosti z lockfilu, vytvoří statický export a otestuje všech 33 stránek v Chromium se zablokovanými externími požadavky. Po úspěšných testech nahraje přes Wrangler pouze `.output/public` do Pages projektu `cryptobyte-static-2026`, zajistí custom domain a DNS a zopakuje testy na veřejné adrese. Workflow lze spustit i ručně přes **Actions → Static archive checks and deploy → Run workflow**. Pull requesty spouštějí pouze sestavení a místní testy, bez nasazení a deploymentových credentials.

Build používá Bun 1.3.14 a Node.js podle `.node-version`. Na Cloudflare běží pouze statické soubory, bez Workeru, Functions, CMS nebo databáze. Build probíhá v GitHub Actions; projekt používá **Direct Upload**, nikoliv Cloudflare Git integration. Přechod existujícího Direct Upload projektu na Git integration není podporovaný; automatické nasazování z GitHubu zajišťuje tento workflow.

### Přístupy a správa

Cloudflare účet: `Antonin.jilek@webatelier.cz's Account`, ID `d23b5b8537a1f23ed0a7b43faa482006`. V GitHub **Settings → Secrets and variables → Actions → Repository secrets** jsou:

- `CLOUDFLARE_ACCOUNT_ID`: ID cílového účtu.
- `CLOUDFLARE_API_TOKEN`: deploymentový token s **Account → Cloudflare Pages → Edit** pro tento účet a **Zone → DNS → Edit** pro `cryptobyte.cz`.

Token používají pouze deploymentové kroky. Samotný web ani sestavení credentials nepotřebují. Repository secrets přepisují stejně pojmenované organizační hodnoty jen pro tento repozitář.

`wrangler.jsonc` určuje název projektu a adresář výstupu; `deployment/cloudflare-pages.json` obsahuje nastavení pro první vytvoření Direct Upload projektu. `scripts/manage-cloudflare-pages.mjs` vytváří pouze chybějící projekt a záznam `2026.cryptobyte.cz`; při kolizi s existujícím DNS záznamem skončí chybou a záznam nepřepíše.

Workflow **Verify Cloudflare access** pouze ověřuje přístup. Workflow **Configure Cloudflare Pages** umožňuje ruční kontrolu stavu (`status`), vytvoření projektu (`setup`) nebo nastavení custom domain (`domain`). Běžné pushování žádný ruční krok nepotřebuje.

### Ověření veřejného webu

Po lokálním sestavení lze stejný browser test spustit proti nasazenému webu:

```sh
STATIC_TEST_ORIGIN=https://2026.cryptobyte.cz bun run test:static
```

Test ověří stránky, obrázky, dashboard, oblíbené, modal, blog a mobilní zobrazení. Každý požadavek na jinou doménu, `/api/` nebo zápis je blokován a způsobí selhání testu. CI ukládá statický export a screenshoty jako artefakty běhu.

Dokumentace: [Pages Direct Upload s CI](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/), [vlastní domény](https://developers.cloudflare.com/pages/configuration/custom-domains/).
