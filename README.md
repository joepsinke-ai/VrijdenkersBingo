# Vrijdenkers Bingo

Live: **https://de-vrijdenkers.netlify.app**

Gebouwd met React, TypeScript en Vite. Netlify zet de site automatisch online zodra er iets op `main` komt.

---

## Hoe werken we samen? (in het kort)

1. Je werkt op je **eigen computer** aan een **eigen kopie** van de app.
2. Je wijzigingen zet je in een **eigen branch** (een aparte werkversie), nooit direct op `main`.
3. Je stuurt je wijziging naar GitHub en opent een **Pull Request** (een voorstel: "wil je dit toevoegen?").
4. Netlify maakt automatisch een **preview-link**, zodat iedereen je wijziging kan bekijken.
5. **Iemand anders keurt het goed**, daarna wordt het samengevoegd en staat het binnen een paar minuten **live**.

> 💡 Alle commando's in deze handleiding kun je ook gewoon aan Claude vragen.

`main` is beveiligd: niemand kan daar direct iets op zetten, ook de eigenaar niet. Alles gaat via een Pull Request met een goedkeuring.

### Een paar woorden uitgelegd

| Woord | Wat het betekent |
|---|---|
| **Repository (repo)** | De map met alle code, online op GitHub. |
| **`main`** | De officiële versie. Wat hier staat, staat live. |
| **Branch** | Een aparte werkversie waarin je rustig kunt werken zonder `main` te raken. |
| **Commit** | Een opgeslagen stap, met een korte beschrijving van wat je deed. |
| **Push / pull** | Je werk naar GitHub sturen / het werk van anderen binnenhalen. |
| **Pull Request (PR)** | Een voorstel om jouw branch toe te voegen aan `main`. |
| **Review** | Iemand anders kijkt naar je wijziging en keurt hem goed (of stelt vragen). |

---

## Eenmalig: je computer klaarmaken

Dit hoef je maar één keer te doen.

1. **Maak een GitHub-account** op [github.com](https://github.com) en geef je gebruikersnaam door aan Joep.
2. **Accepteer de uitnodiging** die je per e-mail krijgt, of via
   [deze link](https://github.com/joepsinke-ai/VrijdenkersBingo/invitations).
3. **Installeer de benodigde programma's:**
   - [Node.js](https://nodejs.org) — versie 22 of nieuwer (kies "LTS")
   - [Git](https://git-scm.com/downloads) — op een Mac staat dit er meestal al
   - [GitHub CLI](https://cli.github.com) (`gh`) — handig om in te loggen en Pull Requests te maken
4. **Log in bij GitHub** vanuit de terminal en volg de stappen op het scherm:
   ```bash
   gh auth login
   ```
5. **Haal het project op** en installeer de onderdelen:
   ```bash
   git clone https://github.com/joepsinke-ai/VrijdenkersBingo.git
   cd VrijdenkersBingo
   npm install
   ```

Controleer of het werkt:

```bash
npm run dev
```

Open daarna **http://localhost:5173** in je browser. Je ziet nu de app, draaiend op je eigen computer. Stoppen doe je met `Ctrl + C` in de terminal.

---

## Elke keer dat je iets wilt veranderen

### Stap 1 — Haal de nieuwste versie op

Anderen hebben misschien al iets veranderd. Begin daarom altijd zo:

```bash
git checkout main
git pull
npm install
```

(`npm install` is alleen nodig als iemand onderdelen heeft toegevoegd, maar het kan geen kwaad.)

### Stap 2 — Maak een eigen branch

Kies een korte naam die zegt wat je gaat doen of waar je aan gaat werken, zonder spaties:

```bash
git checkout -b nieuwe-kerstvragen
```

### Stap 3 — Werk aan de app

We werken **lokaal** aan de app, meestal met hulp van Claude. Doe dat altijd binnen de branch die je net hebt gemaakt.

Je wijzigingen test je met dit commando (of vraag Claude om het voor je te starten):

```bash
npm run dev
```

Open daarna **http://localhost:5173**. Elke keer dat je een bestand opslaat, ververst de app vanzelf. Zo zie je meteen wat je verandert.

Handig om te weten:

- De vragen staan in `src/data/questionsData.ts`.
- De onderdelen van het scherm staan in `src/components/`.
- Ideeën en openstaande punten staan in `FEEDBACK.md`.

### Stap 4 — Controleer of alles klopt

Voordat je je werk deelt:

```bash
npm run build
npm run lint
```

Zie je rode foutmeldingen? Los ze eerst op (of vraag om hulp). Lukt dit hier niet, dan lukt het straks op Netlify ook niet.

### Stap 5 — Sla je werk op (commit)

```bash
git add .
git commit -m "Tien nieuwe kerstvragen toegevoegd"
```

Schrijf een korte, duidelijke beschrijving. Je mag dit meerdere keren doen tijdens je werk.

### Stap 6 — Stuur je werk naar GitHub

```bash
git push -u origin nieuwe-kerstvragen
```

### Stap 7 — Open een Pull Request

```bash
gh pr create
```

Of ga naar [de repo op GitHub](https://github.com/joepsinke-ai/VrijdenkersBingo) en klik op de gele balk **Compare & pull request**.

Beschrijf kort **wat** je hebt veranderd en **waarom**.

### Stap 8 — Wacht op de preview en de review

- Na een paar minuten verschijnt in je Pull Request een **preview-link** van Netlify
  (bijvoorbeeld `deploy-preview-3--de-vrijdenkers.netlify.app`). Stuur die gerust rond.
- **Een van de anderen bekijkt je wijziging.** Die kan:
  - op **Approve** klikken → goedgekeurd;
  - een opmerking plaatsen → pas je werk aan (stap 3 t/m 6 opnieuw, dezelfde branch) en je Pull Request wordt vanzelf bijgewerkt.

### Stap 9 — Samenvoegen en live zetten

Is de Pull Request goedgekeurd en is de preview gelukt? Klik dan op **Squash and merge**.
Netlify zet de nieuwe versie binnen een paar minuten live, en de branch wordt automatisch opgeruimd.

### Stap 10 — Opruimen op je eigen computer

```bash
git checkout main
git pull
git branch -D nieuwe-kerstvragen
```

Klaar! Voor de volgende wijziging begin je weer bij stap 1.

---

## Hoe gaan we om met wijzigingen?

### Regels (worden automatisch afgedwongen)

- Niemand kan direct iets op `main` zetten, alles gaat via een Pull Request.
- Elke Pull Request heeft **één goedkeuring van iemand anders** nodig. Je eigen werk kun je niet zelf goedkeuren.
- Verander je iets ná een goedkeuring, dan moet er **opnieuw** goedgekeurd worden.
- Alle opmerkingen moeten **opgelost** zijn voordat je kunt samenvoegen.
- De **Netlify-preview moet lukken**. Een wijziging die de site kapotmaakt, kan niet live.

### Afspraken

- **Eén wijziging per Pull Request.** Kleine Pull Requests zijn makkelijker te bekijken.
- **Reageer binnen een paar dagen** op een review-verzoek van een ander.
- **Werk je aan hetzelfde bestand als iemand anders?** Stem het even af, dat voorkomt conflicten.
- **Zet nooit wachtwoorden of geheime sleutels in de code.** De repo is openbaar: iedereen kan de code lezen (maar alleen wij kunnen hem wijzigen).
- **Twijfel je?** Open je Pull Request gewoon en vraag het in een opmerking.

### Als er iets misgaat

- **"Conflict" bij samenvoegen?** Iemand anders heeft dezelfde regels veranderd. Haal de nieuwste versie in je branch en los het op:
  ```bash
  git checkout main
  git pull
  git checkout nieuwe-kerstvragen
  git merge main
  ```
  Open de bestanden die Git noemt, kies welke versie je wilt houden, sla op en doe dan `git add .`, `git commit` en `git push`. Lukt het niet? Vraag om hulp.
- **Preview mislukt?** Klik in je Pull Request op **Details** naast de Netlify-melding om te zien wat er fout ging.
- **Iets live gezet dat niet klopt?** Geen paniek: elke wijziging is terug te draaien. Open op GitHub de samengevoegde Pull Request en klik op **Revert**. Dat maakt een nieuwe Pull Request die de wijziging ongedaan maakt.
- **Toch op `main` gewerkt in plaats van een branch?** Geen probleem, zolang je nog niet gecommit hebt: maak nu alsnog een branch met `git checkout -b mijn-branch`. Je wijzigingen gaan mee. (Wel al gecommit? Vraag om hulp.)

---

## Handige commando's

| Commando | Wat het doet |
|---|---|
| `npm run dev` | Start de app op je eigen computer (http://localhost:5173) |
| `npm run build` | Bouwt de site zoals Netlify dat doet, handig om fouten te vinden |
| `npm run lint` | Controleert de code op veelvoorkomende fouten |
| `npm run preview` | Bekijkt de gebouwde versie (na `npm run build`) |
| `git status` | Laat zien op welke branch je zit en wat je hebt veranderd |
| `gh pr status` | Laat de status van jouw Pull Requests zien |
