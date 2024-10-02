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
        },
      },
      ru: {
        translation: {
          login: "Вход",
          username: "Имя пользователя",
          password: "Пароль",
        },
      },
      tj: {
        translation: {
          login: "Даромад",
          username: "Номи корбар",
          password: "Парол",
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