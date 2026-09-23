# Vrijdenkers Bingo

Live: **https://de-vrijdenkers.netlify.app**

Gebouwd met React, TypeScript en Vite. Netlify publiceert de site automatisch vanaf `main`.

## Aan de slag

```bash
git clone https://github.com/joepsinke-ai/VrijdenkersBingo.git
cd VrijdenkersBingo
npm install
npm run dev
```

Andere handige commando's:

- `npm run build` — bouwt de site naar `dist/` (dit doet Netlify ook)
- `npm run lint` — controleert de code met Oxlint

## Werkwijze: altijd via een Pull Request

Alles wat op `main` komt, staat meteen live. Daarom pushen we **nooit direct naar `main`**, maar werken we altijd via een branch en een Pull Request.

1. **Haal de laatste versie op**
   ```bash
   git checkout main
   git pull
   ```
2. **Maak een branch** met een korte, duidelijke naam
   ```bash
   git checkout -b nieuwe-vragen
   ```
3. **Werk en commit** in kleine stappen
   ```bash
   git add .
   git commit -m "Tien nieuwe vragen over filosofie"
   ```
4. **Push je branch** naar GitHub
   ```bash
   git push -u origin nieuwe-vragen
   ```
5. **Open een Pull Request** op GitHub (of met `gh pr create`). Netlify zet er binnen een paar minuten een **preview-link** bij, zodat iedereen de wijziging kan bekijken voordat hij live gaat.
6. **Laat iemand anders meekijken** en voeg de Pull Request daarna samen met **Squash and merge**.
7. **Ruim op**: ga terug naar `main`, haal de nieuwe versie op en verwijder je branch.
   ```bash
   git checkout main
   git pull
   git branch -d nieuwe-vragen
   ```

### Afspraken

- Eén branch per wijziging of functie; houd Pull Requests klein.
- Controleer dat `npm run build` lukt voordat je een Pull Request opent.
- Werken twee mensen aan hetzelfde bestand? Stem het even af, dat voorkomt merge-conflicten.
- Gaat er toch iets mis op `main`? Geen paniek: Netlify houdt de vorige versie online als een build mislukt, en elke wijziging is terug te draaien.
