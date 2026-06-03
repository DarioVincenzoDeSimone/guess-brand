import { Injectable, computed, inject, signal } from '@angular/core';
import { BRANDS, BrandEntry } from '../data/brands';
import { SettingsService } from './settings.service';
import { SoundService } from './sound.service';

export interface RoundResult {
  brand: BrandEntry;
  correct: boolean;
  hintUsed: boolean;
  wrongAttempts: number;
  score: number;
}

const MAX_WRONG = 3;

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly settings = inject(SettingsService);
  private readonly sound    = inject(SoundService);

  // ── Session ──────────────────────────────────────────────────────
  readonly rounds       = signal<BrandEntry[]>([]);
  readonly roundIndex   = signal<number>(0);
  readonly roundResults = signal<RoundResult[]>([]);

  // ── Mode 1: multiple-choice brand names ───────────────────────────
  readonly multiChoiceOptions = signal<BrandEntry[]>([]);

  // ── Mode 2: logo grid ─────────────────────────────────────────────
  readonly logoOptions = signal<BrandEntry[]>([]);

  // ── Shared per-round state ────────────────────────────────────────
  readonly wrongClicks    = signal<Set<string>>(new Set());
  readonly lastWrongClick = signal<string | null>(null);
  readonly correctClicked = signal<string | null>(null);
  readonly hintUsed       = signal<boolean>(false);
  readonly roundComplete  = signal<boolean>(false);
  readonly roundCorrect   = signal<boolean>(false);

  // ── Computed ──────────────────────────────────────────────────────
  readonly currentBrand = computed(() => this.rounds()[this.roundIndex()]);

  readonly currentName = computed(() => {
    const brand = this.currentBrand();
    if (!brand) return '';
    return this.settings.language() === 'it' ? brand.nameIt : brand.nameEn;
  });

  readonly isSessionComplete = computed(() => this.roundIndex() >= 10);

  readonly totalScore = computed(() =>
    this.roundResults().reduce((s, r) => s + r.score, 0)
  );

  readonly roundNumber = computed(() => Math.min(this.roundIndex() + 1, 10));

  // ── Session ───────────────────────────────────────────────────────

  startSession(): void {
    const pool = this.getPool();
    this.rounds.set(this.shuffle(pool).slice(0, 10));
    this.roundIndex.set(0);
    this.roundResults.set([]);
    this.initRound();
  }

  restartCurrentRound(): void {
    if (this.rounds().length === 0 || this.isSessionComplete()) return;
    const pool = this.getPool();
    const usedIds = new Set(this.roundResults().map(r => r.brand.id));
    const available = pool.filter(b => !usedIds.has(b.id));
    const base = available.length > 0 ? available : pool;
    const shuffled = this.shuffle(base);
    const newRounds = [...this.rounds()];
    const remaining = 10 - this.roundIndex();
    for (let i = 0; i < remaining; i++) {
      newRounds[this.roundIndex() + i] = shuffled[i % shuffled.length];
    }
    this.rounds.set(newRounds);
    this.initRound();
  }

  initRound(): void {
    this.wrongClicks.set(new Set());
    this.lastWrongClick.set(null);
    this.correctClicked.set(null);
    this.hintUsed.set(false);
    this.roundComplete.set(false);
    this.roundCorrect.set(false);

    if (this.settings.gameMode() === 1) {
      this.generateMultiChoiceOptions(10);
      this.logoOptions.set([]);
    } else {
      this.generateLogoOptions(10);
      this.multiChoiceOptions.set([]);
    }
  }

  // ── Primary action (both modes) ───────────────────────────────────

  selectOption(brand: BrandEntry): void {
    if (this.roundComplete() || this.wrongClicks().has(brand.id)) return;

    const correct = brand.id === this.currentBrand().id;
    if (correct) {
      this.correctClicked.set(brand.id);
      this.sound.playCorrect();
      this.finishRound(true);
    } else {
      const newClicks = new Set([...this.wrongClicks(), brand.id]);
      this.wrongClicks.set(newClicks);
      this.lastWrongClick.set(brand.id);
      this.sound.playWrong();
      setTimeout(() => this.lastWrongClick.set(null), 600);
      if (newClicks.size >= MAX_WRONG) {
        setTimeout(() => this.finishRound(false), 800);
      }
    }
  }

  // ── Hint ──────────────────────────────────────────────────────────

  useHint(): void {
    if (this.hintUsed() || this.roundComplete()) return;
    this.hintUsed.set(true);

    const current = this.currentBrand();
    if (this.settings.gameMode() === 1) {
      const wrong = this.multiChoiceOptions().filter(
        b => b.id !== current.id && !this.wrongClicks().has(b.id)
      );
      const toRemove = new Set(this.shuffle(wrong).slice(0, 5).map(b => b.id));
      this.multiChoiceOptions.update(opts => opts.filter(b => !toRemove.has(b.id)));
    } else {
      const wrong = this.logoOptions().filter(
        b => b.id !== current.id && !this.wrongClicks().has(b.id)
      );
      const toRemove = new Set(this.shuffle(wrong).slice(0, 5).map(b => b.id));
      this.logoOptions.update(opts => opts.filter(b => !toRemove.has(b.id)));
    }
  }

  // ── Private ───────────────────────────────────────────────────────

  private finishRound(correct: boolean): void {
    if (this.roundComplete()) return;
    this.roundComplete.set(true);
    this.roundCorrect.set(correct);
    if (correct) this.sound.playRoundWin();

    this.roundResults.update(r => [...r, {
      brand:         this.currentBrand(),
      correct,
      hintUsed:      this.hintUsed(),
      wrongAttempts: this.wrongClicks().size,
      score:         this.calculateScore(correct),
    }]);

    setTimeout(() => {
      this.roundIndex.update(i => i + 1);
      if (!this.isSessionComplete()) this.initRound();
    }, 2000);
  }

  private calculateScore(correct: boolean): number {
    if (!correct) return 0;
    let score = 10;
    if (this.hintUsed()) score -= 3;
    score -= this.wrongClicks().size * 2;
    return Math.max(0, score);
  }

  private generateMultiChoiceOptions(count: number): void {
    const current = this.currentBrand();
    const pool = this.getPool().filter(b => b.id !== current.id);
    this.multiChoiceOptions.set(
      this.shuffle([current, ...this.shuffle(pool).slice(0, count - 1)])
    );
  }

  private generateLogoOptions(count: number): void {
    const current = this.currentBrand();
    const pool = this.getPool().filter(b => b.id !== current.id);
    this.logoOptions.set(
      this.shuffle([current, ...this.shuffle(pool).slice(0, count - 1)])
    );
  }

  private getPool(): BrandEntry[] {
    const d = this.settings.difficulty();
    if (d === 'easy')   return BRANDS.filter(b => b.difficulty === 'easy');
    if (d === 'medium') return BRANDS.filter(b => b.difficulty !== 'hard');
    return BRANDS;
  }

  private shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
