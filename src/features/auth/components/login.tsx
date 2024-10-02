import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../../assets/aoa-logo.png';

const LoginPage = () => {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen relative">
            <div className="w-full md:w-1/2 bg-pink-200 flex items-center justify-center"> {/* Centering the image */}
                <img src={logo} alt="Description" className="max-w-xs" /> {/* Add your image here */}
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center p-4">
                <div className="form-control w-full max-w-sm">
                    <h1 className="text-3xl font-bold mb-6 text-center">{t('login')}</h1> {/* Translated Login text */}
                    <label className="label">
                        <span className="label-text">{t('username')}</span> {/* Translated Username */}
                    </label>
                    <input type="text" placeholder={t('username')} className="input input-bordered" />
                    <label className="label">
                        <span className="label-text">{t('password')}</span> {/* Translated Password */}
                    </label>
                    <input type="password" placeholder={t('password')} className="input input-bordered" />
                    <button className="btn btn-primary mt-4">{t('login')}</button>
                </div>
            </div>
            <div className="absolute top-4 right-4">
                <select className="select select-bordered" onChange={handleLanguageChange}>
                    <option value="en">EN</option>
                    <option value="ru">RU</option>
                    <option value="tj">TJ</option>
                </select>
            </div>
        </div>
    );
};

export default LoginPage;
