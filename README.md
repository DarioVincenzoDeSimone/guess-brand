# 🚗 Guess Brand!

> *A car-brand logo quiz for children — the third game in a growing family suite.*

Live: **[DarioVincenzoDeSimone.github.io/guess-brand](https://DarioVincenzoDeSimone.github.io/guess-brand/)**

<img width="415" height="898" alt="Image" src="https://github.com/user-attachments/assets/3fd6cc93-8d5b-45b8-a470-ba6fd0eaefed" />

---

## The Philosophy — Playing Side by Side

The best education doesn't look like education. It looks like a parent and a child sitting together in front of the screen, asking *"do you know whose logo that is?"*, and discovering that the world of cars — with its history of design, engineering, and craftsmanship — can become a natural source of curiosity and culture.

**Guess Brand** was designed from scratch with children in mind: no ads, no accounts, no dark patterns. Just logos, names, and the slow joy of recognising a mark you hadn't noticed before.

---

## Vibe Coding as a Parenting Practice

*Vibe coding* means sitting side by side with your child and building something together — explaining what the code does in plain words, letting them suggest features, watching those features appear on screen. It turns screen time into collaborative, creative, educational time.

When your child asks *"why does Ferrari use a horse?"* or *"what country is Škoda from?"*, a whole conversation about history, geography, and design opens up. That is the real lesson.

---

## A Growing Family Game Suite

This game is the third in a collection, built game by game as children grow:

| Game | Description | Live |
|---|---|---|
| [**L'Impiccato**](https://github.com/DarioVincenzoDeSimone/impiccato) | Classic Hangman — Italian vocabulary, multiplayer mode | [▶ Play](https://DarioVincenzoDeSimone.github.io/impiccato/) |
| [**Guess Flag!**](https://github.com/DarioVincenzoDeSimone/guess-flag) | World-flags geography quiz — 195 countries, two modes | [▶ Play](https://DarioVincenzoDeSimone.github.io/guess-flag/) |
| **Guess Brand!** | Car-brand & moto logo quiz — 65 brands, two modes *(this project)* | [▶ Play](https://DarioVincenzoDeSimone.github.io/guess-brand/) |
| *More coming…* | Each game designed by a parent who cares | |

Every game in the suite shares the same visual identity — sky-blue shell, pink titles, orange play button — so switching between them feels seamless.

---

## How to Play

**Mode 1 — Logo → Brand 🏷️**
A car brand logo appears in the centre of the screen. Ten brand names are shown at the bottom — tap the right one.
You have 3 lives ❤️❤️❤️ per round. Wrong taps cost a life; lose all three and the round fails.
The 💡 hint cuts the choices from 10 down to 5.

**Mode 2 — Brand → Logo 🔍**
A brand name appears at the top. Ten logos are shown in a grid — tap the right one.
Same 3-life rule applies. The 💡 hint removes 5 wrong logos.

Settings let you choose:
- **Difficulty** — Easy (21 brands), Medium (47), Hard (all 65)
- **Language** — Italiano / English
- **Sound** — On / Off

Each session is 10 rounds. Maximum score: 100 points (10 per round, −2 per wrong tap, −3 for the hint, 0 for a failed round).

---

## The Brand Collection

**Easy (21)** — Toyota, BMW, Mercedes-Benz, Volkswagen, Ford, Audi, Ferrari, Lamborghini, Porsche, Honda, Tesla, Fiat, Renault, Hyundai, Volvo, Dacia, Lancia + Ducati, Harley-Davidson, Vespa, Piaggio

**Medium (47)** — all of the above plus Nissan, Mazda, Kia, Peugeot, Citroën, Mini, Alfa Romeo, Maserati, Jeep, Chevrolet, Land Rover, Subaru, Mitsubishi, SEAT, Škoda, Opel, Suzuki, Jaguar, MG, BYD, Haval, Rivian + Yamaha, Kawasaki, Triumph, Aprilia

**Hard (65)** — all of the above plus Dodge, Cadillac, Bugatti, Acura, Lexus, Infiniti, Genesis, Aston Martin, Buick, Bentley, Rolls-Royce, Pagani, McLaren, Koenigsegg, Lynk & Co, SsangYong + KTM, Royal Enfield

---

## Technical Highlights

- **Angular 21** with standalone components, signals, OnPush everywhere, zoneless
- **Tailwind CSS v4** — zero runtime CSS overhead
- **GitHub Pages SPA** via `HashLocationStrategy` (no server config needed)
- **SVG logos** from [Simple Icons](https://simpleicons.org) — crisp at any size, served as static files
- **Web Audio API** sound effects — no audio files to download
- **Zero tracking, zero ads, offline-friendly** after the first load
- **Mobile-first** — thumb-friendly grid, works on any screen size from 360 px up

---

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Download brand SVGs into public/assets/logos/ (one-time setup)
npm run download-logos

# 3. Start the dev server
npm start
# App available at http://localhost:4202
```

---

## Deploying to GitHub Pages

```bash
# From Git Bash (required on Windows):
npm run deploy
```

Builds with the correct `baseHref` and publishes to the `gh-pages` branch via `angular-cli-ghpages`.

See [`docs/DEPLOY.md`](docs/DEPLOY.md) for the full step-by-step guide.

---

## Project Structure

```
src/app/
  data/brands.ts            # 65 brands with IT/EN names + difficulty tier
  services/
    settings.service.ts     # Persisted settings (localStorage)
    game.service.ts         # Core game state (Angular signals)
    sound.service.ts        # Web Audio sound effects
  components/
    settings-modal/         # Settings overlay
  pages/
    home/                   # Mode & difficulty selector
    game/                   # Active game (both modes in one component)
    results/                # End-of-session scoreboard
scripts/
  download-logos.mjs        # Downloads SVGs from cdn.simpleicons.org
public/assets/logos/        # 65 brand SVG files
docs/                       # Architecture, game design, deploy & scope docs
```
