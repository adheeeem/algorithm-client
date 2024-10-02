import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          login: "Login",
          username: "Username",
          password: "Password",
          'header.title': 'Academy of Algorithm',
          'header.dashboard': 'Dashboard',
          'header.standings': 'Standings',
          'header.profile': 'Profile',
          'dashboard.welcome': 'Welcome to the Dashboard',
        },
      },
      ru: {
        translation: {
          login: "Вход",
          username: "Имя пользователя",
          password: "Пароль",
          'header.title': 'Академия Алгоритмов',
          'header.dashboard': 'Панель управления',
          'header.standings': 'Рейтинг',
          'header.profile': 'Профиль',
          'dashboard.welcome': 'Добро пожаловать в Панель управления',
        },
      },
      tj: {
        translation: {
          login: "Даромад",
          username: "Номи корбар",
          password: "Парол",
          'header.title': 'Академияи Алгоритм',
          'header.dashboard': 'Дошкаи назорат',
          'header.standings': 'Рейтинг',
          'header.profile': 'Профил',
          'dashboard.welcome': 'Хуш омадед ба Дошкаи назорат',
        },
      },
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;