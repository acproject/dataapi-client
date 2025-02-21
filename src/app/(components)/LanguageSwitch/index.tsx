'use client'

import { Languages } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n, { changeLanguage } from '@/i18n';

const LanguageSwitch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLanguageChange = (lang: 'en' | 'zh') => {
        changeLanguage(lang);
        setIsOpen(false);
    };
    // 点击外部关闭下拉菜单
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='flex justify-items-center ' ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)}
                className='flex items-center text-gray-500 hover:text-gray-700'>
                <Languages className='cursor-pointer' size={24} />
            </button>
            {isOpen && (
                <div className='absolute pr-0 mt-6 w-48 rounded-md
                shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black 
                ring-opacity-5'>
                    <div className='float-left '>
                        <button
                            onClick={() => handleLanguageChange('zh')}
                            className={`${i18n.language === 'zh' ? 'bg-gray-100 dark:bg-gray-700' : ''
                                } w-full text-left px-0 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700`}
                        >
                             {t('language.zh')}
                        </button>
                        <button
                            onClick={() => handleLanguageChange('en')}
                            className={`${i18n.language === 'en' ? 'bg-gray-100 dark:bg-gray-700' : ''
                                } w-full text-left px-0 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700`}
                        >
                            {t('language.en')}
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default LanguageSwitch;