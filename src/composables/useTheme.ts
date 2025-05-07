import { ref, onMounted, watch } from 'vue'

export function useTheme() {
  const theme = ref<'light' | 'dark'>((localStorage.getItem('theme') as any) || 'light')

  const apply = (t: 'light' | 'dark') => {
    document.documentElement.className = t
    localStorage.setItem('theme', t)
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  onMounted(() => {
    apply(theme.value)
  })

  watch(theme, (t) => apply(t))

  return { theme, toggleTheme }
}
