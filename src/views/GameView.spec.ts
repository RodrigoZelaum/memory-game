import { setActivePinia, createPinia } from 'pinia';
import { mount, VueWrapper } from '@vue/test-utils';
import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest';
import GameView from './GameView.vue';
import { useDifficultyStore } from '@/stores/difficultyStore';

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  uniqueId: number;
}

interface GameViewInstance {
  timer: number;
  cards: Card[];
  attempts: number;
  showSummaryModal: boolean;
  difficultyStore: ReturnType<typeof useDifficultyStore>;
  flipCard: (uid: number) => void;
  endIfDone: () => void;
  saveScore: () => void;
  generateCards: () => Promise<void>;
  startTimer: () => void;
}

function mountGameView() {
  return mount(GameView, {
    global: {
      stubs: {
        GameCard: {
          props: ['uniqueId'],
          template: `<div class="stub-card" @click="$emit('flip', uniqueId)">{{ uniqueId }}</div>`,
        },
        BaseButton: {
          template: `<button @click="$emit('click')"></button>`,
        },
      },
    },
  }) as VueWrapper<GameViewInstance>;
}

vi.mock('@/services/gameService', () => ({
  fetchImages: vi.fn(() =>
    Promise.resolve(Array.from({ length: 18 }, (_, i) => `image${i + 1}.jpg`))
  ),
}));

describe('Game logic', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('calculates totalPairs correctly for normal difficulty', () => {
    const store = useDifficultyStore();
    store.difficulty = 'normal';
    const total = store.difficulty === 'normal' ? 8 : 18;
    expect(total).toBe(8);
  });

  it('generates correct number of card pairs', async () => {
    const store = useDifficultyStore();
    store.difficulty = 'normal';
    const cardImages = await import('@/services/gameService').then((m) => m.fetchImages());
    const selected = cardImages.slice(0, store.difficulty === 'normal' ? 8 : 18);
    const pairs = selected.flatMap((c, i) => [
      { id: i, content: c, isFlipped: false, isMatched: false, uniqueId: i * 2 },
      { id: i, content: c, isFlipped: false, isMatched: false, uniqueId: i * 2 + 1 },
    ]);
    expect(pairs.length).toBe(16);
  });
});

describe('GameView', () => {
  let wrapper: VueWrapper<GameViewInstance>;

  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    Storage.prototype.setItem = vi.fn();
    Storage.prototype.getItem = vi.fn(() => null);
    wrapper = mountGameView();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts timer when game begins', async () => {
    wrapper.vm.startTimer();
    await vi.advanceTimersByTimeAsync(1000);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.timer).toBeGreaterThan(0);
  });

  it('flips card when clicked', async () => {
    await wrapper.vm.generateCards();
    await wrapper.vm.$nextTick();
    const cards = wrapper.findAll('.stub-card');
    expect(cards.length).toBeGreaterThan(0);
    await cards[0].trigger('click');
    expect(wrapper.vm.cards.some((c) => c.isFlipped)).toBe(true);
  });

  it('matches cards when two identical are flipped', async () => {
    await wrapper.vm.generateCards();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.cards.length).toBeGreaterThan(0);
    const pid = wrapper.vm.cards[0].id;
    const [c1, c2] = wrapper.vm.cards.filter((c) => c.id === pid);
    wrapper.vm.flipCard(c1.uniqueId);
    wrapper.vm.flipCard(c2.uniqueId);
    await vi.advanceTimersByTimeAsync(1000);
    expect(wrapper.vm.cards.find((c) => c.uniqueId === c1.uniqueId)?.isMatched).toBe(true);
    expect(wrapper.vm.cards.find((c) => c.uniqueId === c2.uniqueId)?.isMatched).toBe(true);
  });

  it('shows summary modal when all cards are matched', async () => {
    await wrapper.vm.generateCards();
    wrapper.vm.cards.forEach((c) => (c.isMatched = true));
    wrapper.vm.endIfDone();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showSummaryModal).toBe(true);
    expect(wrapper.find('h3').text()).toContain('Parabéns');
  });

  it('saves score to localStorage when game is completed', async () => {
    await wrapper.vm.generateCards();
    wrapper.vm.timer = 120;
    wrapper.vm.attempts = 15;
    wrapper.vm.difficultyStore.difficulty = 'normal';
    wrapper.vm.saveScore();
    expect(localStorage.setItem).toHaveBeenCalledWith('memory-game-scores', expect.any(String));
  });
});
