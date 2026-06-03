# Game Design Document — Guess Brand!

## Overview

**Guess Brand!** is a car brand identification game for children aged 5–12.
A session is 10 rounds. Each round presents a logo puzzle in one of two modes.
The session ends on a results screen with score, accuracy, and a recap.

---

## Game Modes

### Mode 1 — Guess the Brand (🏷️ Logo → Brand name)

1. A car brand SVG logo is displayed prominently in the center.
2. Ten brand-name buttons appear at the bottom in a 2-column grid.
3. The player taps a button:
   - **Correct**: button turns green, ✅ badge on the logo container, success sound.
   - **Wrong**: button turns red, ❌ shake animation, one life lost.
4. After **3 wrong taps** the round fails automatically (0 points); the correct answer is highlighted in green.
5. **Hint**: reduces the 10 options to 5 by removing 5 wrong choices.

### Mode 2 — Guess the Logo (🔍 Brand name → Logo)

1. The brand name is displayed prominently at the top.
2. Ten brand logos are shown in a 2-column grid at the bottom.
3. The player taps a logo:
   - **Correct**: logo card turns green, ✅ badge, success sound.
   - **Wrong**: logo card turns red, ❌ badge + shake animation, one life lost.
4. After **3 wrong taps** the round fails automatically (0 points); the correct logo is highlighted.
5. **Hint**: removes 5 wrong logos (randomly chosen, excluding already-clicked ones).

---

## Difficulty System

| Difficulty | Pool size | Criteria |
|---|---|---|
| Easy | 15 | Major globally-known brands (Toyota, BMW, Mercedes, VW, Ford…) |
| Medium | 30 | Easy + well-known European, Japanese, Korean brands |
| Hard | 44 | All brands including niche/luxury/American brands |

The pool is shuffled at session start; the first 10 entries become the rounds.

---

## Lives System

Each round starts with **3 lives** displayed as ❤️❤️❤️ hearts below the stats bar.
Every wrong tap removes one heart. Reaching 0 lives ends the round as a failure.
Lives reset to 3 at the start of each new round.

---

## Hint System

- Each round has **one hint** (💡 button in the header).
- Using it is irreversible for that round; the icon becomes greyed.
- The hint resets at the start of each new round.
- Hint usage is recorded in `RoundResult.hintUsed` for scoring.

---

## Scoring

| Event | Points |
|---|---|
| Correct answer | +10 base |
| Each wrong tap (either mode) | −2 |
| Using hint | −3 |
| Round failure (3 wrong taps) | 0 (regardless of other deductions) |
| Minimum round score on success | 0 |

Maximum session score: 10 rounds × 10 points = **100 points**.

---

## Settings & Mid-Game Reset

Settings (difficulty, mode, language, sound) are persisted to `localStorage`.
Changing difficulty or mode mid-game triggers `restartCurrentRound()`:
remaining rounds are regenerated from the new pool, keeping already-scored results.

---

## Brand Data

44 brands across 3 difficulty tiers:
- **Easy (15)**: Toyota, BMW, Mercedes, Volkswagen, Ford, Audi, Ferrari, Lamborghini, Porsche, Honda, Tesla, Fiat, Renault, Hyundai, Volvo
- **Medium (15)**: Nissan, Mazda, Kia, Peugeot, Citroën, Mini, Alfa Romeo, Maserati, Jeep, Chevrolet, Land Rover, Bentley, Rolls-Royce, Subaru, Mitsubishi
- **Hard (14)**: Dodge, Cadillac, Bugatti, SEAT, Škoda, Opel, Acura, Lexus, Infiniti, Genesis, Suzuki, Jaguar, Aston Martin, Buick

Each brand has Italian and English names (`nameIt`, `nameEn`).
SVG logos are served from `public/assets/logos/{id}.svg` (simple-icons slugs).
