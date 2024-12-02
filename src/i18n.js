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
          'pass_test': 'Pass the test',
          'download_file': 'Download test',
          'data_1': 'Data 1',
          'data_2': 'Data 2',
          'header_1': 'Attempt',
          'header_2': 'Correct answers',
          'header.logout': 'Logout',
          'notFound.message': 'Page not found',
          'notFound.backToHome': 'Back to Home',
          'unit.selected': 'Unit {{unitNumber}}',
          'enrollment.enrolled': 'You are enrolled in this unit',
          'enrollment.notEnrolled': 'You are not enrolled in this unit',
          'enrollment.notPaid': 'This unit requires payment to enroll',
          'enrollment.contactAdmin': 'Please contact administrator for payment details',
          'enrollment.enroll': 'Enroll in this Unit',
          'enrollment.status.unpaid.title': 'Payment Required',
          'enrollment.status.unpaid.contact': 'Please contact an administrator for payment instructions.',
          'enrollment.status.unpaid.message': 'Course access will be granted after payment confirmation.',
          'enrollment.status.ready.title': 'Ready to Start Learning',
          'enrollment.status.ready.description': 'You\'re all set to begin this unit.',
          'enrollment.status.ready.button': 'Enroll Now',
          'enrollment.status.ready.subtitle': 'Start your learning journey today!',
          'header.date': 'Date',
          'no.attempts': 'No attempts yet'
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
          'pass_test': 'Пройти тест',
          'download_file': 'Скачать тест',
          'data_1': 'Данные 1',
          'data_2': 'Данные 2',
          'header_1': '',
          'header_2': 'Правильных ответов',
          'header.logout': 'Выйти',
          'notFound.message': 'Страница не найдена',
          'notFound.backToHome': 'Вернуться на главную',
          'unit.selected': 'Глава {{unitNumber}}',
          'enrollment.enrolled': 'Вы записаны на эту главу',
          'enrollment.notEnrolled': 'Вы не записаны на эту главу',
          'enrollment.notPaid': 'Для записи на эту главу требуется оплата',
          'enrollment.contactAdmin': 'Пожалуйста, обратитесь к администратору для получения информации о платежах',
          'enrollment.enroll': 'Записаться на эту главу',
          'enrollment.status.unpaid.title': 'Payment Required',
          'enrollment.status.unpaid.contact': 'Please contact an administrator for payment instructions.',
          'enrollment.status.unpaid.message': 'Course access will be granted after payment confirmation.',
          'enrollment.status.ready.title': 'Ready to Start Learning',
          'enrollment.status.ready.description': 'You\'re all set to begin this unit.',
          'enrollment.status.ready.button': 'Enroll Now',
          'enrollment.status.ready.subtitle': 'Start your learning journey today!',
          'header.date': 'Дата',
          'no.attempts': 'Пока нет попыток'
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
          'pass_test': 'Пройти тест',
          'download_file': 'Скачать тест',
          'data_1': 'Данные 1',
          'data_2': 'Данные 2',
          'header_1': '',
          'header_2': 'Правильных ответов',
          'header.logout': 'Вийти',
          'notFound.message': 'Страница не найдена',
          'notFound.backToHome': 'Вернуться на главную',
          'unit.selected': 'Глава {{unitNumber}}',
          'enrollment.enrolled': 'Вы записаны на эту главу',
          'enrollment.notEnrolled': 'Вы не записаны на эту главу',
          'enrollment.notPaid': 'Барои сабти ном дар ин боб пардохт лозим аст',
          'enrollment.contactAdmin': 'Пожалуйста, обратитесь к администратору для получения информации о платежах',
          'enrollment.enroll': 'Записаться на эту главу',
          'enrollment.status.unpaid.title': 'Payment Required',
          'enrollment.status.unpaid.contact': 'Please contact an administrator for payment instructions.',
          'enrollment.status.unpaid.message': 'Course access will be granted after payment confirmation.',
          'enrollment.status.ready.title': 'Ready to Start Learning',
          'enrollment.status.ready.description': 'You\'re all set to begin this unit.',
          'enrollment.status.ready.button': 'Enroll Now',
          'enrollment.status.ready.subtitle': 'Start your learning journey today!',
          'header.date': 'Дата',
          'no.attempts': 'Пока нет попыток'
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