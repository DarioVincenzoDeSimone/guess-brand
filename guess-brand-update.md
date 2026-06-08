# Guess Brand — Aggiornamento brands.ts

## Obiettivo

Aggiornare il file `brands.ts` del gioco Guess Brand con:
1. Correzioni ai livelli di difficoltà dei brand esistenti
2. Nuovi brand (auto e moto) con i relativi loghi già disponibili in `public/assets/logos/`

---

## 1. Correzioni difficoltà sui brand esistenti

Applica queste modifiche ai brand già presenti:

| id | Difficoltà attuale | Nuova difficoltà |
|---|---|---|
| `bentley` | medium | **hard** |
| `rollsroyce` | medium | **hard** |
| `seat` | hard | **medium** |
| `skoda` | hard | **medium** |
| `opel` | hard | **medium** |
| `suzuki` | hard | **medium** |
| `jaguar` | hard | **medium** |

---

## 2. Nuovi brand da aggiungere

I loghi SVG sono già stati inseriti in `public/assets/logos/`. Aggiungi le seguenti voci all'array `BRANDS` nel file `brands.ts`, rispettando la struttura esistente (`id`, `nameIt`, `nameEn`, `difficulty`).

### Auto — EASY

```ts
{ id: 'dacia',         nameIt: 'Dacia',         nameEn: 'Dacia',         difficulty: 'easy' },
{ id: 'lancia',        nameIt: 'Lancia',         nameEn: 'Lancia',        difficulty: 'easy' },
```

### Auto — MEDIUM

```ts
{ id: 'mg',            nameIt: 'MG',             nameEn: 'MG',            difficulty: 'medium' },
{ id: 'byd',           nameIt: 'BYD',            nameEn: 'BYD',           difficulty: 'medium' },
{ id: 'haval',         nameIt: 'Haval',          nameEn: 'Haval',         difficulty: 'medium' },
{ id: 'rivian',        nameIt: 'Rivian',         nameEn: 'Rivian',        difficulty: 'medium' },
```

### Auto — HARD

```ts
{ id: 'pagani',        nameIt: 'Pagani',         nameEn: 'Pagani',        difficulty: 'hard' },
{ id: 'mclaren',       nameIt: 'McLaren',        nameEn: 'McLaren',       difficulty: 'hard' },
{ id: 'koenigsegg',    nameIt: 'Koenigsegg',     nameEn: 'Koenigsegg',    difficulty: 'hard' },
{ id: 'lynkco',        nameIt: 'Lynk & Co',      nameEn: 'Lynk & Co',     difficulty: 'hard' },
{ id: 'sssangyong',    nameIt: 'SsangYong',      nameEn: 'SsangYong',     difficulty: 'hard' },
```

### Moto — EASY

```ts
{ id: 'ducati',        nameIt: 'Ducati',         nameEn: 'Ducati',        difficulty: 'easy' },
{ id: 'harleydavidson',nameIt: 'Harley-Davidson',nameEn: 'Harley-Davidson',difficulty: 'easy' },
{ id: 'vespa',         nameIt: 'Vespa',          nameEn: 'Vespa',         difficulty: 'easy' },
{ id: 'piaggio',       nameIt: 'Piaggio',        nameEn: 'Piaggio',       difficulty: 'easy' },
```

### Moto — MEDIUM

```ts
{ id: 'yamaha',        nameIt: 'Yamaha',         nameEn: 'Yamaha',        difficulty: 'medium' },
{ id: 'kawasaki',      nameIt: 'Kawasaki',       nameEn: 'Kawasaki',      difficulty: 'medium' },
{ id: 'triumph',       nameIt: 'Triumph',        nameEn: 'Triumph',       difficulty: 'medium' },
{ id: 'aprilia',       nameIt: 'Aprilia',        nameEn: 'Aprilia',       difficulty: 'medium' },
```

### Moto — HARD

```ts
{ id: 'ktm',           nameIt: 'KTM',            nameEn: 'KTM',           difficulty: 'hard' },
{ id: 'royalenfield',  nameIt: 'Royal Enfield',  nameEn: 'Royal Enfield', difficulty: 'hard' },
```

---

## 3. Logica di categoria (opzionale ma consigliato)

Se il tipo `BrandEntry` non ha già un campo `category`, valuta se aggiungerlo per distinguere auto da moto in eventuali filtri futuri:

```ts
export type Category = 'car' | 'moto';

export interface BrandEntry {
  id: string;
  nameIt: string;
  nameEn: string;
  difficulty: Difficulty;
  category: Category;   // nuovo campo opzionale
}
```

Se lo aggiungi, aggiorna anche tutti i brand esistenti impostando `category: 'car'`, e i nuovi moto con `category: 'moto'`. Valuta insieme al team se questa estensione è utile ora o da rimandare.

---

## 4. Note

- Non modificare la logica di gioco, solo il dataset.
- Verifica che per ogni `id` aggiunto esista il file corrispondente in `public/assets/logos/{id}.svg` prima di fare merge.
- Se un logo non è presente, Prova a scaricare l'svg come fatto in precedenza, se non lo trovi segnalalo in chat.
- L'ordinamento nell'array non è rilevante per la logica di gioco, ma mantieni i gruppi per difficoltà per leggibilità.
