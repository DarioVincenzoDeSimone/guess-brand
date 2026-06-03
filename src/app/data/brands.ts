export type Difficulty = 'easy' | 'medium' | 'hard';

export interface BrandEntry {
  id: string;        // simple-icons slug → asset filename: public/assets/logos/{id}.svg
  nameIt: string;
  nameEn: string;
  difficulty: Difficulty;
}

export const BRANDS: BrandEntry[] = [
  // ── EASY (~15) — brands known by everyone ──────────────────────
  { id: 'toyota',       nameIt: 'Toyota',       nameEn: 'Toyota',       difficulty: 'easy' },
  { id: 'bmw',          nameIt: 'BMW',           nameEn: 'BMW',          difficulty: 'easy' },
  { id: 'mercedesbenz', nameIt: 'Mercedes',      nameEn: 'Mercedes',     difficulty: 'easy' },
  { id: 'volkswagen',   nameIt: 'Volkswagen',    nameEn: 'Volkswagen',   difficulty: 'easy' },
  { id: 'ford',         nameIt: 'Ford',          nameEn: 'Ford',         difficulty: 'easy' },
  { id: 'audi',         nameIt: 'Audi',          nameEn: 'Audi',         difficulty: 'easy' },
  { id: 'ferrari',      nameIt: 'Ferrari',       nameEn: 'Ferrari',      difficulty: 'easy' },
  { id: 'lamborghini',  nameIt: 'Lamborghini',   nameEn: 'Lamborghini',  difficulty: 'easy' },
  { id: 'porsche',      nameIt: 'Porsche',       nameEn: 'Porsche',      difficulty: 'easy' },
  { id: 'honda',        nameIt: 'Honda',         nameEn: 'Honda',        difficulty: 'easy' },
  { id: 'tesla',        nameIt: 'Tesla',         nameEn: 'Tesla',        difficulty: 'easy' },
  { id: 'fiat',         nameIt: 'Fiat',          nameEn: 'Fiat',         difficulty: 'easy' },
  { id: 'renault',      nameIt: 'Renault',       nameEn: 'Renault',      difficulty: 'easy' },
  { id: 'hyundai',      nameIt: 'Hyundai',       nameEn: 'Hyundai',      difficulty: 'easy' },
  { id: 'volvo',        nameIt: 'Volvo',         nameEn: 'Volvo',        difficulty: 'easy' },

  // ── MEDIUM (~15) — well-known but less universal ────────────────
  { id: 'nissan',       nameIt: 'Nissan',        nameEn: 'Nissan',       difficulty: 'medium' },
  { id: 'mazda',        nameIt: 'Mazda',         nameEn: 'Mazda',        difficulty: 'medium' },
  { id: 'kia',          nameIt: 'Kia',           nameEn: 'Kia',          difficulty: 'medium' },
  { id: 'peugeot',      nameIt: 'Peugeot',       nameEn: 'Peugeot',      difficulty: 'medium' },
  { id: 'citroen',      nameIt: 'Citroën',       nameEn: 'Citroën',      difficulty: 'medium' },
  { id: 'mini',         nameIt: 'Mini',          nameEn: 'Mini',         difficulty: 'medium' },
  { id: 'alfaromeo',    nameIt: 'Alfa Romeo',    nameEn: 'Alfa Romeo',   difficulty: 'medium' },
  { id: 'maserati',     nameIt: 'Maserati',      nameEn: 'Maserati',     difficulty: 'medium' },
  { id: 'jeep',         nameIt: 'Jeep',          nameEn: 'Jeep',         difficulty: 'medium' },
  { id: 'chevrolet',    nameIt: 'Chevrolet',     nameEn: 'Chevrolet',    difficulty: 'medium' },
  { id: 'landrover',    nameIt: 'Land Rover',    nameEn: 'Land Rover',   difficulty: 'medium' },
  { id: 'bentley',      nameIt: 'Bentley',       nameEn: 'Bentley',      difficulty: 'medium' },
  { id: 'rollsroyce',   nameIt: 'Rolls-Royce',   nameEn: 'Rolls-Royce',  difficulty: 'medium' },
  { id: 'subaru',       nameIt: 'Subaru',        nameEn: 'Subaru',       difficulty: 'medium' },
  { id: 'mitsubishi',   nameIt: 'Mitsubishi',    nameEn: 'Mitsubishi',   difficulty: 'medium' },

  // ── HARD (~14) — enthusiasts & specialists ─────────────────────
  { id: 'dodge',        nameIt: 'Dodge',         nameEn: 'Dodge',        difficulty: 'hard' },
  { id: 'cadillac',     nameIt: 'Cadillac',      nameEn: 'Cadillac',     difficulty: 'hard' },
  { id: 'bugatti',      nameIt: 'Bugatti',       nameEn: 'Bugatti',      difficulty: 'hard' },
  { id: 'seat',         nameIt: 'SEAT',          nameEn: 'SEAT',         difficulty: 'hard' },
  { id: 'skoda',        nameIt: 'Škoda',         nameEn: 'Škoda',        difficulty: 'hard' },
  { id: 'opel',         nameIt: 'Opel',          nameEn: 'Opel',         difficulty: 'hard' },
  { id: 'acura',        nameIt: 'Acura',         nameEn: 'Acura',        difficulty: 'hard' },
  { id: 'lexus',        nameIt: 'Lexus',         nameEn: 'Lexus',        difficulty: 'hard' },
  { id: 'infiniti',     nameIt: 'Infiniti',      nameEn: 'Infiniti',     difficulty: 'hard' },
  { id: 'genesis',      nameIt: 'Genesis',       nameEn: 'Genesis',      difficulty: 'hard' },
  { id: 'suzuki',       nameIt: 'Suzuki',        nameEn: 'Suzuki',       difficulty: 'hard' },
  { id: 'jaguar',       nameIt: 'Jaguar',        nameEn: 'Jaguar',       difficulty: 'hard' },
  { id: 'astonmartin',  nameIt: 'Aston Martin',  nameEn: 'Aston Martin', difficulty: 'hard' },
  { id: 'buick',        nameIt: 'Buick',         nameEn: 'Buick',        difficulty: 'hard' },
];
