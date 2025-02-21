import i18n  from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


// 动态导入 JSON 文件
import enTranslation from './locales/en/translation.json';
import zhTranslation from './locales/zh/translation.json';

const loadResources = async (lng:string) => {
    const { default: resources} =await import(`./locales/${lng}/translation.json`);
    i18n.addResourceBundle(lng, 'translation', resources);
}

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
    resources: {
        en: {
            translation: enTranslation,
        },
        zh: {
            translation: zhTranslation,
        },
    },
    fallbackLng: 'zh',
    debug: true,
    interpolation: {
        escapeValue: false,
    }
})
i18n.on('languageChanged', (lng) => {
    loadResources(lng);
});

export const changeLanguage = (lng:'en' | 'zh') => {
    i18n.changeLanguage(lng);
}

export default i18n;