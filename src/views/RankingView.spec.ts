import { setActivePinia, createPinia } from 'pinia';
import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import RankingView from './RankingView.vue';

interface Score {
  timestamp: number;
  difficulty: string;
  time: number;
  attempts: number;
}

interface RankingViewInstance {
  scores: Score[];
  formatTime: (seconds: number) => string;
  goHome: () => void;
}

function mountRankingView() {
  return mount(RankingView, {
    global: {
      stubs: {
        BaseButton: {
          props: ['label', 'onClick', 'variant'],
          template: `<button @click="onClick">{{ label }}</button>`,
        },
      },
    },
  }) as VueWrapper<RankingViewInstance>;
}

describe('RankingView', () => {
  let backSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    Storage.prototype.getItem = vi.fn() as Mock;
    backSpy = vi.spyOn(window.history, 'back').mockImplementation(() => {});
  });

  it('loads and displays top 5 sorted scores', async () => {
    const unsorted: Score[] = [
      { timestamp: 1, difficulty: 'hard', time: 120, attempts: 5 },
      { timestamp: 2, difficulty: 'normal', time: 100, attempts: 3 },
      { timestamp: 3, difficulty: 'normal', time: 100, attempts: 2 },
      { timestamp: 4, difficulty: 'hard', time: 90, attempts: 4 },
      { timestamp: 5, difficulty: 'normal', time: 80, attempts: 6 },
      { timestamp: 6, difficulty: 'hard', time: 70, attempts: 7 },
    ];
    (localStorage.getItem as Mock).mockReturnValue(JSON.stringify(unsorted));
    const wrapper = mountRankingView();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.scores).toHaveLength(5);
    expect(wrapper.vm.scores[0]).toEqual({
      timestamp: 6,
      difficulty: 'hard',
      time: 70,
      attempts: 7,
    });
    const rows = wrapper.findAll('tbody tr').filter((r) => !r.text().includes('Nenhum recorde'));
    expect(rows).toHaveLength(5);
  });

  it('shows no-record message when no scores in storage', async () => {
    (localStorage.getItem as Mock).mockReturnValue(null);
    const wrapper = mountRankingView();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.scores).toHaveLength(0);
    expect(wrapper.find('tbody tr td').text()).toContain('Nenhum recorde registrado ainda');
  });

  it('formats time correctly', () => {
    const wrapper = mountRankingView();
    expect(wrapper.vm.formatTime(5)).toBe('00:05');
    expect(wrapper.vm.formatTime(65)).toBe('01:05');
    expect(wrapper.vm.formatTime(3665)).toBe('61:05');
  });

  it('calls history.back when Voltar button is clicked', () => {
    const wrapper = mountRankingView();
    wrapper.find('button').trigger('click');
    expect(backSpy).toHaveBeenCalled();
  });
});
