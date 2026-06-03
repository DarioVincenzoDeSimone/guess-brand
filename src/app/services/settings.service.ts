import { Injectable, effect, signal } from '@angular/core';
import { Difficulty } from '../data/brands';

export type Language = 'it' | 'en';
export type GameMode = 1 | 2;

const TRANSLATIONS = {
  modeTitle1:    { it: 'Indovina il Brand',    en: 'Guess the Brand'    },
  modeTitle2:    { it: 'Indovina il Logo',     en: 'Guess the Logo'     },
  round:         { it: 'Round',                en: 'Round'              },
  score:         { it: 'Punteggio',            en: 'Score'              },
  hint:          { it: 'Suggerimento',         en: 'Hint'               },
  settings:      { it: 'Impostazioni',         en: 'Settings'           },
  difficulty:    { it: 'Difficoltà',           en: 'Difficulty'         },
  diffEasy:      { it: 'Facile',               en: 'Easy'               },
  diffMedium:    { it: 'Medio',                en: 'Medium'             },
  diffHard:      { it: 'Difficile',            en: 'Hard'               },
  mode:          { it: 'Modalità',             en: 'Mode'               },
  language:      { it: 'Lingua',               en: 'Language'           },
  sound:         { it: 'Suoni',                en: 'Sounds'             },
  on:            { it: 'Sì',                   en: 'On'                 },
  off:           { it: 'No',                   en: 'Off'                },
  play:          { it: 'GIOCA',                en: 'PLAY'               },
  home:          { it: 'HOME',                 en: 'HOME'               },
  playAgain:     { it: 'GIOCA ANCORA',         en: 'PLAY AGAIN'         },
  results:       { it: 'RISULTATI',            en: 'RESULTS'            },
  correct:       { it: 'Corrette',             en: 'Correct'            },
  accuracy:      { it: 'Precisione',           en: 'Accuracy'           },
  closeSettings: { it: 'CHIUDI',               en: 'CLOSE'              },
  mode1:         { it: 'Logo → Brand',         en: 'Logo → Brand'       },
  mode2:         { it: 'Brand → Logo',         en: 'Brand → Logo'       },
} as const;

type TranslationKey = keyof typeof TRANSLATIONS;

const STORAGE_KEYS = {
  difficulty: 'gb_difficulty',
  gameMode:   'gb_game_mode',
  language:   'gb_language',
  sound:      'gb_sound',
} as const;

@Injectable({ providedIn: 'root' })
export class SettingsService {
  readonly difficulty = signal<Difficulty>(this.load(STORAGE_KEYS.difficulty, 'easy') as Difficulty);
  readonly gameMode   = signal<GameMode>(Number(this.load(STORAGE_KEYS.gameMode, '1')) as GameMode);
  readonly language   = signal<Language>(this.load(STORAGE_KEYS.language, 'it') as Language);
  readonly sound      = signal<boolean>(this.load(STORAGE_KEYS.sound, 'true') === 'true');

  constructor() {
    effect(() => localStorage.setItem(STORAGE_KEYS.difficulty, this.difficulty()));
    effect(() => localStorage.setItem(STORAGE_KEYS.gameMode,   String(this.gameMode())));
    effect(() => localStorage.setItem(STORAGE_KEYS.language,   this.language()));
    effect(() => localStorage.setItem(STORAGE_KEYS.sound,      String(this.sound())));
  }

  t(key: TranslationKey): string {
    return TRANSLATIONS[key][this.language()];
  }

  private load(key: string, fallback: string): string {
    if (typeof localStorage === 'undefined') return fallback;
    return localStorage.getItem(key) ?? fallback;
  }
}
