import { ChangeDetectionStrategy, Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { SettingsService } from '../../services/settings.service';
import { SettingsModalComponent } from '../../components/settings-modal/settings-modal.component';

const LIVES = [0, 1, 2] as const;

@Component({
  selector: 'app-game',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SettingsModalComponent],
  template: `
    <div class="shell">

      <!-- ── Header ─────────────────────────────────────── -->
      <div class="header-actions">
        <button type="button" class="icon-btn"
          [attr.aria-label]="s.t('hint')"
          [disabled]="game.hintUsed() || game.roundComplete()"
          (click)="game.useHint()"
          [class.icon-btn--used]="game.hintUsed()">
          <span class="material-icons" aria-hidden="true">lightbulb</span>
        </button>
        <button type="button" class="icon-btn"
          (click)="openSettings()" [attr.aria-label]="s.t('settings')">
          <span class="material-icons" aria-hidden="true">settings</span>
        </button>
      </div>

      <header class="game-header">
        <h1 class="game-title">
          {{ s.gameMode() === 1 ? s.t('modeTitle1') : s.t('modeTitle2') }}
        </h1>
        <div class="stats-bar">
          <div class="stat-chip stat-chip--round" aria-label="Round">
            <span class="material-icons" aria-hidden="true">flag</span>
            <span>{{ game.roundNumber() }} / 10</span>
          </div>
          <div class="stat-chip stat-chip--score" [attr.aria-label]="s.t('score')">
            <span class="material-icons" aria-hidden="true">star</span>
            <span>{{ game.totalScore() }}</span>
          </div>
        </div>
        <div class="lives-row" role="status"
             [attr.aria-label]="'Tentativi rimasti: ' + (3 - game.wrongClicks().size)">
          @for (i of lives; track i) {
            <span class="material-icons live"
                  [class.live--lost]="game.wrongClicks().size > i"
                  aria-hidden="true">favorite</span>
          }
        </div>
      </header>

      <!-- ── Mode 1: Logo → guess brand name ────────────── -->
      @if (s.gameMode() === 1) {

        <div class="logo-stage">
          @if (game.currentBrand()) {
            <div class="logo-wrap" [class.logo-win]="game.roundComplete() && game.roundCorrect()">
              <img [src]="logoSrc()" [alt]="game.currentName()"
                   class="logo-img" loading="eager"
                   (error)="onLogoError($event)">
            </div>
          }
          @if (game.roundComplete()) {
            <div class="result-badge" aria-live="polite">
              {{ game.roundCorrect() ? '✅' : '❌' }}
            </div>
          }
        </div>

        <!-- MC options pushed to bottom -->
        <div class="mc-area">
          <div class="mc-grid">
            @for (opt of game.multiChoiceOptions(); track opt.id) {
              @let isWrong   = game.wrongClicks().has(opt.id);
              @let isCorrect = game.correctClicked() === opt.id ||
                               (game.roundComplete() && !game.roundCorrect() && opt.id === game.currentBrand().id);
              @let isShaking = game.lastWrongClick() === opt.id;

              <button type="button" class="mc-btn"
                [class.mc-btn--wrong]="isWrong"
                [class.mc-btn--correct]="isCorrect"
                [class.shake]="isShaking"
                [disabled]="game.roundComplete() || isWrong"
                (click)="game.selectOption(opt)"
                [attr.aria-label]="s.language() === 'it' ? opt.nameIt : opt.nameEn">
                {{ s.language() === 'it' ? opt.nameIt : opt.nameEn }}
              </button>
            }
          </div>
        </div>
      }

      <!-- ── Mode 2: Brand name → guess logo ────────────── -->
      @if (s.gameMode() === 2) {

        <div class="brand-name-display" aria-live="polite">
          {{ game.currentName() }}
          @if (game.roundComplete()) {
            <span>{{ game.roundCorrect() ? ' ✅' : ' ❌' }}</span>
          }
        </div>

        <div class="lg-area">
          <div class="lg-grid" role="group"
               [attr.aria-label]="s.language() === 'it' ? 'Scegli il logo' : 'Choose the logo'">
            @for (brand of game.logoOptions(); track brand.id) {
              @let isWrong   = game.wrongClicks().has(brand.id);
              @let isCorrect = game.correctClicked() === brand.id ||
                               (game.roundComplete() && !game.roundCorrect() && brand.id === game.currentBrand().id);
              @let isShaking = game.lastWrongClick() === brand.id;

              <button type="button" class="lg-btn"
                [class.lg-btn--wrong]="isWrong"
                [class.lg-btn--correct]="isCorrect"
                [class.shake]="isShaking"
                [disabled]="game.roundComplete() || isWrong"
                (click)="game.selectOption(brand)"
                [attr.aria-label]="s.language() === 'it' ? brand.nameIt : brand.nameEn">
                <img [src]="'assets/logos/' + brand.id + '.svg'"
                     [alt]="s.language() === 'it' ? brand.nameIt : brand.nameEn"
                     loading="lazy" class="lg-img"
                     (error)="onLogoError($event)">
                @if (isWrong) {
                  <div class="lg-badge" aria-hidden="true">❌</div>
                }
                @if (isCorrect) {
                  <div class="lg-badge" aria-hidden="true">✅</div>
                }
              </button>
            }
          </div>
        </div>
      }

    </div>

    @if (settingsOpen()) {
      <app-settings-modal (close)="closeSettings()" />
    }
  `,
  styles: [`
    :host { display: block; height: 100%; }

    .shell {
      display: flex; flex-direction: column; align-items: center;
      height: 100%; padding: 0.75rem;
      background: #e0f2fe; border: 8px solid #bae6fd; border-radius: 1.5rem;
      box-shadow: inset 0 2px 16px rgba(0,0,0,0.08);
      box-sizing: border-box; position: relative; overflow: clip; gap: 0.4rem;
    }

    /* ── Header ── */
    .header-actions {
      position: absolute; top: 0.75rem; right: 0.75rem;
      display: flex; gap: 0.5rem; z-index: 10;
    }
    .icon-btn {
      width: 2.75rem; height: 2.75rem; min-width: 2.75rem;
      background: white; border: 2px solid #bae6fd; border-radius: 9999px;
      display: flex; align-items: center; justify-content: center;
      color: #0284c7; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      transition: transform 0.1s;
    }
    .icon-btn:active { transform: scale(0.95); }
    .icon-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
    .icon-btn--used { color: #94a3b8; }

    .game-header { text-align: center; margin-top: 2.75rem; flex-shrink: 0; }
    .game-title {
      font-size: clamp(1rem, 3.5vw, 1.4rem); font-weight: 900; color: #ec4899;
      text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 0.3rem;
    }
    .stats-bar { display: flex; gap: 0.75rem; justify-content: center; }
    .stat-chip {
      display: flex; align-items: center; gap: 0.3rem;
      padding: 0.3rem 0.7rem; border-radius: 0.75rem;
      font-weight: 900; font-size: 0.95rem; color: white; flex-shrink: 0;
    }
    .stat-chip .material-icons { font-size: 1rem; }
    .stat-chip--round { background: #fb923c; border-bottom: 3px solid #ea8c00; }
    .stat-chip--score { background: #a78bfa; border-bottom: 3px solid #7c3aed; }
    .lives-row { display: flex; gap: 0.25rem; justify-content: center; margin-top: 0.4rem; }
    .live { font-size: 1.25rem; color: #f87171; transition: color 0.25s, transform 0.25s; }
    .live--lost { color: #cbd5e1; transform: scale(0.75); }

    /* ── Mode 1: logo hero ── */
    .logo-stage {
      position: relative; width: 100%; max-width: 260px; flex-shrink: 0;
      display: flex; justify-content: center; align-items: center;
    }
    /* Square white container: best for car logos which have varied aspect ratios */
    .logo-wrap {
      width: 100%; aspect-ratio: 1/1;
      background: white; border-radius: 1.25rem;
      border: 3px solid #bae6fd;
      box-shadow: 0 4px 16px rgba(0,0,0,0.12);
      display: flex; align-items: center; justify-content: center;
      padding: 1.25rem; box-sizing: border-box;
      transition: transform 0.3s, border-color 0.3s;
    }
    .logo-img {
      width: 100%; height: 100%; object-fit: contain;
      filter: drop-shadow(0 1px 3px rgba(0,0,0,0.12));
    }
    .logo-win { transform: scale(1.03); border-color: #4ade80; }

    .result-badge {
      position: absolute; font-size: 3rem;
      animation: pop-in 0.35s ease-out; pointer-events: none; z-index: 5;
    }

    /* ── Mode 1: multiple choice ── */
    .mc-area { margin-top: auto; width: 100%; max-width: 32rem; flex-shrink: 0; }
    .mc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; }
    .mc-btn {
      padding: 0.7rem 0.4rem; border-radius: 1rem;
      background: white; border: 2px solid #bae6fd;
      font-weight: 900; font-size: clamp(0.75rem, 2.5vw, 0.9rem);
      color: #0369a1; cursor: pointer;
      transition: background 0.15s, border-color 0.15s, transform 0.1s;
      text-transform: uppercase; letter-spacing: 0.04em;
      min-height: 3rem; touch-action: manipulation;
    }
    .mc-btn:hover:not(:disabled) { background: #e0f2fe; }
    .mc-btn:active:not(:disabled) { transform: scale(0.97); }
    .mc-btn:disabled { cursor: not-allowed; opacity: 0.45; }
    .mc-btn--wrong   { background: #fef2f2; border-color: #fca5a5; color: #dc2626; opacity: 0.55; }
    .mc-btn--correct { background: #dcfce7; border-color: #4ade80; color: #15803d; }

    /* ── Mode 2: brand name display ── */
    .brand-name-display {
      font-size: clamp(1.4rem, 5.5vw, 2.2rem); font-weight: 900; color: #0c4a6e;
      text-transform: uppercase; letter-spacing: 0.05em; text-align: center;
      padding: 0.5rem 1rem; background: white;
      border-radius: 1rem; border: 3px solid #bae6fd;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08); max-width: 90%; flex-shrink: 0;
    }

    /* ── Mode 2: logo grid ── */
    .lg-area {
      flex: 1; min-height: 0; width: 100%; max-width: 32rem;
      display: flex; flex-direction: column; overflow-y: auto; padding-bottom: 0.25rem;
    }
    .lg-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;
      margin-top: auto;
    }
    /* Square buttons: car logos look best in a square container */
    .lg-btn {
      position: relative; aspect-ratio: 1/1;
      border-radius: 0.875rem; border: 2.5px solid #bae6fd;
      background: white;
      display: flex; align-items: center; justify-content: center;
      padding: 0.75rem; cursor: pointer; overflow: hidden;
      transition: border-color 0.15s, transform 0.1s, box-shadow 0.15s;
      touch-action: manipulation; box-sizing: border-box;
    }
    .lg-btn:hover:not(:disabled) { border-color: #7dd3fc; box-shadow: 0 2px 8px rgba(0,0,0,0.12); }
    .lg-btn:active:not(:disabled) { transform: scale(0.97); }
    .lg-btn:disabled { cursor: not-allowed; }
    .lg-img {
      width: 100%; height: 100%; object-fit: contain; pointer-events: none;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));
    }
    .lg-btn--wrong   { border-color: #fca5a5; background: #fef2f2; opacity: 0.5; }
    .lg-btn--correct { border-color: #4ade80; background: #dcfce7; }
    .lg-badge {
      position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; background: rgba(255,255,255,0.7); pointer-events: none;
    }

    /* ── Animations ── */
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%      { transform: translateX(-6px); }
      60%      { transform: translateX(6px); }
    }
    .shake { animation: shake 0.4s ease; }
    @keyframes pop-in {
      from { transform: scale(0.4); opacity: 0; }
      to   { transform: scale(1);   opacity: 1; }
    }
  `]
})
export class GameComponent implements OnInit {
  protected readonly game   = inject(GameService);
  protected readonly s      = inject(SettingsService);
  private   readonly router = inject(Router);

  protected readonly settingsOpen = signal(false);
  protected readonly lives = LIVES;

  private settingsSnapshot: { difficulty: string; gameMode: number } | null = null;

  readonly logoSrc = computed(() => {
    const brand = this.game.currentBrand();
    return brand ? `assets/logos/${brand.id}.svg` : '';
  });

  constructor() {
    effect(() => {
      if (this.game.isSessionComplete()) this.router.navigate(['/results']);
    });
  }

  ngOnInit(): void {
    if (this.game.rounds().length === 0) this.game.startSession();
  }

  openSettings(): void {
    this.settingsSnapshot = { difficulty: this.s.difficulty(), gameMode: this.s.gameMode() };
    this.settingsOpen.set(true);
  }

  closeSettings(): void {
    this.settingsOpen.set(false);
    if (this.settingsSnapshot) {
      const changed =
        this.settingsSnapshot.difficulty !== this.s.difficulty() ||
        this.settingsSnapshot.gameMode   !== this.s.gameMode();
      if (changed) this.game.restartCurrentRound();
      this.settingsSnapshot = null;
    }
  }

  onLogoError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.visibility = 'hidden';
  }
}
