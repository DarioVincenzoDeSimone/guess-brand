export type Difficulty = 'easy' | 'medium' | 'hard';

export interface BrandEntry {
  id: string;        // simple-icons slug → asset filename: public/assets/logos/{id}.svg
  nameIt: string;
  nameEn: string;
  difficulty: Difficulty;
}

export const BRANDS: BrandEntry[] = [
  // ── AUTO EASY ─────────────────────────────────────────────────
  { id: 'toyota',        nameIt: 'Toyota',        nameEn: 'Toyota',        difficulty: 'easy' },
  { id: 'bmw',           nameIt: 'BMW',            nameEn: 'BMW',           difficulty: 'easy' },
  { id: 'mercedesbenz',  nameIt: 'Mercedes',       nameEn: 'Mercedes',      difficulty: 'easy' },
  { id: 'volkswagen',    nameIt: 'Volkswagen',     nameEn: 'Volkswagen',    difficulty: 'easy' },
  { id: 'ford',          nameIt: 'Ford',           nameEn: 'Ford',          difficulty: 'easy' },
  { id: 'audi',          nameIt: 'Audi',           nameEn: 'Audi',          difficulty: 'easy' },
  { id: 'ferrari',       nameIt: 'Ferrari',        nameEn: 'Ferrari',       difficulty: 'easy' },
  { id: 'lamborghini',   nameIt: 'Lamborghini',    nameEn: 'Lamborghini',   difficulty: 'easy' },
  { id: 'porsche',       nameIt: 'Porsche',        nameEn: 'Porsche',       difficulty: 'easy' },
  { id: 'honda',         nameIt: 'Honda',          nameEn: 'Honda',         difficulty: 'easy' },
  { id: 'tesla',         nameIt: 'Tesla',          nameEn: 'Tesla',         difficulty: 'easy' },
  { id: 'fiat',          nameIt: 'Fiat',           nameEn: 'Fiat',          difficulty: 'easy' },
  { id: 'renault',       nameIt: 'Renault',        nameEn: 'Renault',       difficulty: 'easy' },
  { id: 'hyundai',       nameIt: 'Hyundai',        nameEn: 'Hyundai',       difficulty: 'easy' },
  { id: 'volvo',         nameIt: 'Volvo',          nameEn: 'Volvo',         difficulty: 'easy' },
  { id: 'dacia',         nameIt: 'Dacia',          nameEn: 'Dacia',         difficulty: 'easy' },
  { id: 'lancia',        nameIt: 'Lancia',         nameEn: 'Lancia',        difficulty: 'easy' },

  // ── AUTO MEDIUM ───────────────────────────────────────────────
  { id: 'nissan',        nameIt: 'Nissan',         nameEn: 'Nissan',        difficulty: 'medium' },
  { id: 'mazda',         nameIt: 'Mazda',          nameEn: 'Mazda',         difficulty: 'medium' },
  { id: 'kia',           nameIt: 'Kia',            nameEn: 'Kia',           difficulty: 'medium' },
  { id: 'peugeot',       nameIt: 'Peugeot',        nameEn: 'Peugeot',       difficulty: 'medium' },
  { id: 'citroen',       nameIt: 'Citroën',        nameEn: 'Citroën',       difficulty: 'medium' },
  { id: 'mini',          nameIt: 'Mini',           nameEn: 'Mini',          difficulty: 'medium' },
  { id: 'alfaromeo',     nameIt: 'Alfa Romeo',     nameEn: 'Alfa Romeo',    difficulty: 'medium' },
  { id: 'maserati',      nameIt: 'Maserati',       nameEn: 'Maserati',      difficulty: 'medium' },
  { id: 'jeep',          nameIt: 'Jeep',           nameEn: 'Jeep',          difficulty: 'medium' },
  { id: 'chevrolet',     nameIt: 'Chevrolet',      nameEn: 'Chevrolet',     difficulty: 'medium' },
  { id: 'landrover',     nameIt: 'Land Rover',     nameEn: 'Land Rover',    difficulty: 'medium' },
  { id: 'subaru',        nameIt: 'Subaru',         nameEn: 'Subaru',        difficulty: 'medium' },
  { id: 'mitsubishi',    nameIt: 'Mitsubishi',     nameEn: 'Mitsubishi',    difficulty: 'medium' },
  { id: 'seat',          nameIt: 'SEAT',           nameEn: 'SEAT',          difficulty: 'medium' },
  { id: 'skoda',         nameIt: 'Škoda',          nameEn: 'Škoda',         difficulty: 'medium' },
  { id: 'opel',          nameIt: 'Opel',           nameEn: 'Opel',          difficulty: 'medium' },
  { id: 'suzuki',        nameIt: 'Suzuki',         nameEn: 'Suzuki',        difficulty: 'medium' },
  { id: 'jaguar',        nameIt: 'Jaguar',         nameEn: 'Jaguar',        difficulty: 'medium' },
  { id: 'mg',            nameIt: 'MG',             nameEn: 'MG',            difficulty: 'medium' },
  { id: 'byd',           nameIt: 'BYD',            nameEn: 'BYD',           difficulty: 'medium' },
  
  // ── AUTO HARD ─────────────────────────────────────────────────
  { id: 'dodge',         nameIt: 'Dodge',          nameEn: 'Dodge',         difficulty: 'hard' },
  { id: 'cadillac',      nameIt: 'Cadillac',       nameEn: 'Cadillac',      difficulty: 'hard' },
  { id: 'bugatti',       nameIt: 'Bugatti',        nameEn: 'Bugatti',       difficulty: 'hard' },
  { id: 'acura',         nameIt: 'Acura',          nameEn: 'Acura',         difficulty: 'hard' },
  { id: 'lexus',         nameIt: 'Lexus',          nameEn: 'Lexus',         difficulty: 'hard' },
  { id: 'infiniti',      nameIt: 'Infiniti',       nameEn: 'Infiniti',      difficulty: 'hard' },
  { id: 'genesis',       nameIt: 'Genesis',        nameEn: 'Genesis',       difficulty: 'hard' },
  { id: 'astonmartin',   nameIt: 'Aston Martin',   nameEn: 'Aston Martin',  difficulty: 'hard' },
  { id: 'buick',         nameIt: 'Buick',          nameEn: 'Buick',         difficulty: 'hard' },
  { id: 'bentley',       nameIt: 'Bentley',        nameEn: 'Bentley',       difficulty: 'hard' },
  { id: 'rollsroyce',    nameIt: 'Rolls-Royce',    nameEn: 'Rolls-Royce',   difficulty: 'hard' },
  { id: 'pagani',        nameIt: 'Pagani',         nameEn: 'Pagani',        difficulty: 'hard' },
  { id: 'mclaren',       nameIt: 'McLaren',        nameEn: 'McLaren',       difficulty: 'hard' },
  { id: 'koenigsegg',    nameIt: 'Koenigsegg',     nameEn: 'Koenigsegg',    difficulty: 'hard' },
  { id: 'lynkco',        nameIt: 'Lynk & Co',      nameEn: 'Lynk & Co',     difficulty: 'hard' },
  { id: 'ssangyong',    nameIt: 'SsangYong',      nameEn: 'SsangYong',     difficulty: 'hard' },
  { id: 'rivian',        nameIt: 'Rivian',         nameEn: 'Rivian',        difficulty: 'hard' },

  // ── MOTO EASY ─────────────────────────────────────────────────
  { id: 'ducati',        nameIt: 'Ducati',         nameEn: 'Ducati',        difficulty: 'easy' },
  { id: 'harleydavidson',nameIt: 'Harley-Davidson',nameEn: 'Harley-Davidson',difficulty: 'easy' },
  { id: 'vespa',         nameIt: 'Vespa',          nameEn: 'Vespa',         difficulty: 'easy' },
  { id: 'piaggio',       nameIt: 'Piaggio',        nameEn: 'Piaggio',       difficulty: 'easy' },

  // ── MOTO MEDIUM ───────────────────────────────────────────────
  { id: 'yamaha',        nameIt: 'Yamaha',         nameEn: 'Yamaha',        difficulty: 'medium' },
  { id: 'kawasaki',      nameIt: 'Kawasaki',       nameEn: 'Kawasaki',      difficulty: 'medium' },
  { id: 'triumph',       nameIt: 'Triumph',        nameEn: 'Triumph',       difficulty: 'medium' },

  // ── MOTO HARD ─────────────────────────────────────────────────
  { id: 'ktm',           nameIt: 'KTM',            nameEn: 'KTM',           difficulty: 'hard' },
  // { id: 'royalenfield',  nameIt: 'Royal Enfield',  nameEn: 'Royal Enfield', difficulty: 'hard' },
];
