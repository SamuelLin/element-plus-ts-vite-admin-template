import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import zh from '@/locales/en.json'

export default createI18n({
  legacy: false,
  locale: localStorage.getItem('Tg-Locale') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  },
  globalInjection: true
})
