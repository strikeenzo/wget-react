import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend)
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .init({
        fallbackLng: 'en',
        //lng: "de", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        },

        // During development the translation files are served from
        // locales/<lang>/<ns>.json but when copied over to the django site
        // (i.e.) production, the path is /static/react/locales/<lang>/<ns>.json
        backend: {
            loadPath:
                process.env.NODE_ENV === "production"
                    ? `/static/react/locales/{{lng}}/{{ns}}.json`
                    : `/locales/{{lng}}/{{ns}}.json`
        },
    });

export default i18n;