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

Konfigurace je připravená v repozitáři. První propojení s Cloudflare ještě není aktivní: místní Wrangler má přístup pouze k účtu Dream Innovations, zatímco archiv 2025 běží v jiném účtu. Doména `2026.cryptobyte.cz` dosud není nastavená.

Po propojení bude každý push do `main` automaticky sestaven a nasazen přímo přes Cloudflare Pages Git integration. Preview deploymenty jsou v připravené konfiguraci vypnuté. Nenasazuje se Worker, `.output/server`, CMS ani databáze.

### Jednorázové propojení

V Cloudflare účtu, kde běží archiv 2025:

1. Povol aplikaci **Cloudflare Workers and Pages** přístup k GitHub repozitáři `develit-io/cryptobyte-static-2026`, pokud ho ještě nemá.
2. Založ **Pages** projekt přes **Connect to Git**, název `cryptobyte-static-2026`, produkční větev `main`.
3. Zadej nastavení níže a spusť první build.
4. Po úspěšném deployi přidej custom domain `2026.cryptobyte.cz` a dokonči nabídnuté nastavení DNS.

| Nastavení | Hodnota |
| --- | --- |
| Framework preset | None |
| Root directory | kořen repozitáře |
| Build command | `bun install --frozen-lockfile && bun run build` |
| Build output directory | `.output/public` |
| `BUN_VERSION` | `1.3.14` |
| `NODE_VERSION` | `26.0.0` |
| `SKIP_DEPENDENCY_INSTALL` | `1` |

Tyto build proměnné nejsou tajné údaje. Samotný web žádné proměnné ani tajné údaje nepotřebuje.

`wrangler.jsonc` určuje název projektu a adresář statického výstupu. `deployment/cloudflare-pages.json` obsahuje připravené tělo požadavku pro Cloudflare API **Create project**, včetně GitHub integrace a produkčních buildů. Tento JSON se sám neaplikuje; pro vytvoření projektu je nutný přístup ke správnému Cloudflare účtu a již povolená GitHub integrace.

### Automatická kontrola repozitáře

GitHub Actions workflow `.github/workflows/ci.yml` při pushi do `main` a při pull requestu:

- nainstaluje závislosti z lockfilu a vytvoří statický export;
- otevře všech 33 stránek v Chromium se zablokovanými externími požadavky;
- ověří obrázky, dashboard, oblíbené, detail přednášky, blog a mobilní seznam;
- uloží screenshoty a celý export jako artefakty běhu.

Tento workflow neposílá data na Cloudflare a nepotřebuje deploymentové tokeny. Automatický deploy po jednorázovém propojení provádí samostatně Cloudflare Pages; nečeká na GitHub CI.

Dokumentace: [Cloudflare Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/), [build image](https://developers.cloudflare.com/pages/configuration/build-image/), [Create project API](https://developers.cloudflare.com/api/resources/pages/subresources/projects/methods/create/).
