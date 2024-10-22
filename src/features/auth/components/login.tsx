import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import aoaLogo from '../../../assets/aoa-logo.png';
import { useLogin } from '@/lib/auth';
import { useUser } from '@/lib/auth';
import { SquareLoader } from '@/components/ui/loader/square-loader';

const LoginPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, ] = useState('');
    const login = useLogin({ username, password });
    const { data: userData, isLoading } = useUser();
    const navigate = useNavigate();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(event.target.value);
    };

    useEffect(() => {
        if (userData?.statusCode === 200) {
            navigate('/dashboard');
        }
    }, [userData, navigate]);

    if (isLoading) {
        return <SquareLoader /> // Or your custom loading component
    }

    return (
        <div className="flex flex-col md:flex-row h-screen relative">
            <div className="hidden md:flex w-1/2 bg-slate-300 items-center justify-center p-4"> {/* Hide on mobile */}
                <img src={aoaLogo} alt="Aoa Logo" className="max-w-full h-auto" /> {/* Responsive image */}
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center p-4">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    login.mutate();
                }} className="form-control w-full max-w-sm">
                    <h1 className="text-3xl font-bold mb-6 text-center">{t('login')}</h1> {/* Translated Login text */}
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <label className="label">
                        <span className="label-text">{t('username')}</span> {/* Translated Username */}
                    </label>
                    <input
                        type="text"
                        placeholder={t('username')}
                        className="input input-bordered"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="label">
                        <span className="label-text">{t('password')}</span> {/* Translated Password */}
                    </label>
                    <input
                        type="password"
                        placeholder={t('password')}
                        className="input input-bordered"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary mt-4">{t('login')}</button>
                </form>
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
