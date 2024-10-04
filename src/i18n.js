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
          'header.weeks': 'Weeks',
          'dashboard.welcome': 'Welcome to the Dashboard',
          'user.grade': 'Grade', // Grade
          'user.score': 'Score', // Score
          'unit.label': 'Unit {{unitNumber}}', // Unit Label
          'weeks.week1': 'Week 1',
          'weeks.week2': 'Week 2',
          'weeks.week3': 'Week 3',
          'weeks.week4': 'Week 4',
          'subjects.polynomials': 'Polynomials',
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
          'header.weeks': 'Недели',
          'dashboard.welcome': 'Добро пожаловать в Панель управления',
          'user.grade': 'Класс', // Grade
          'user.score': 'Балл', // Score
          'unit.label': 'Глава {{unitNumber}}', // Unit Label
          'weeks.week1': 'Неделя 1',
          'weeks.week2': 'Неделя 2',
          'weeks.week3': 'Неделя 3',
          'weeks.week4': 'Неделя 4',
          'subjects.polynomials': 'Полиномы',
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
          'header.weeks': 'Недели',
          'dashboard.welcome': 'Хуш омадед ба Дошкаи назорат',
          'user.grade': 'Синф', // Grade
          'user.score': 'Балл', // Score
          'unit.label': 'Боб {{unitNumber}}', // Unit Label
          'weeks.week1': 'Неде 1',
          'weeks.week2': 'Неде 2',
          'weeks.week3': 'Неде 3',
          'weeks.week4': 'Неде 4',
          'subjects.polynomials': 'Полином',
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