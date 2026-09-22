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

## Nasazení později

Nasazení ani DNS teď nejsou nastavené. Pro budoucí statický hosting:

1. Sestav archiv příkazem `bun run build`.
2. Nahraj celý obsah `.output/public` jako kořen webu, včetně adresářů `_nuxt`, fontů a obrázků.
3. Hosting musí obsluhovat adresářové `index.html`, například `/dashboard/index.html` na `/dashboard/`. Pro nenalezené stránky použij `404.html`.
4. Až bude hosting připravený, připoj `2026.cryptobyte.cz` a nastav DNS a HTTPS podle vybraného poskytovatele.

Nenasazuje se `.output/server`, Worker ani Node.js proces. Nejsou potřeba žádné proměnné prostředí, CMS tokeny nebo databázové bindings. Konkrétní provider se vybere samostatně.

Statický výstup odpovídá [postupu Nuxt pro statické nasazení](https://nuxt.com/docs/4.x/getting-started/deployment#static-hosting).
