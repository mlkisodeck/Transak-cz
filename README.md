# TRZ Potvrzení - Doklad o transakci

Tento projekt je dvoustánkový statický web sloužící jako portál pro doklad o transakci. Zobrazuje podrobnosti o konkrétní transakci.

**Důležitá poznámka:** Tato verze webu je navržena tak, aby zobrazovala pevné rozložení typu "desktop" na všech zařízeních. Stránka s potvrzením je vykreslena s šířkou 1366px a prohlížeč ji škáluje tak, aby se vešla na skutečnou velikost obrazovky, což zajišťuje identické zobrazení všude.

## Jak spustit

Z bezpečnostních důvodů moderních prohlížečů nelze soubor `index.html` otevřít přímo. Projekt musí být obsluhován malým lokálním webovým serverem.

Nejjednodušší způsob je použít vestavěný server Pythonu.

1.  **Otevřete terminál** a přejděte do složky projektu:
    ```bash
    cd /cesta/k/projektu/trz_site
    ```

2.  **Spusťte server**:
    ```bash
    python -m http.server 8000
    ```

3.  **Otevřete prohlížeč** a přejděte na adresu:
    [http://localhost:8000](http://localhost:8000)

## Konfigurace

Všechna konfigurace se nachází na začátku souboru `assets/app.js`.

1.  **Login Hash (`VALID_HASH`)**: Chcete-li změnit přihlašovací kód, upravte tuto konstantu.

2.  **Transaction Metadata (`METADATA`)**: Chcete-li aktualizovat podrobnosti transakce, upravte tento objekt.

## Vizuální přizpůsobení

Vzhled webu lze upravit úpravou proměnných CSS definovaných na začátku souboru `assets/style.css`.

```css
/* v assets/style.css */
:root {
    --c-bg: #0a0a0a;
    --c-accent-teal: #00e6e6;
    /* ... atd ... */
}
```