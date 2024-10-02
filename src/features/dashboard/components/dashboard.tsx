import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // Import Link for navigation
import aoaLogo from '../../../assets/aoa-logo-notext.png'; // Adjust the path based on your folder structure

const Dashboard: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(event.target.value);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <header className="flex flex-col items-center justify-between p-4 bg-base-100 shadow-md">
                <div className="flex items-center justify-between w-full">
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="btn btn-square">
                            {/* Hamburger Icon */}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                    <div className="absolute right-4">
                        <select className="select select-bordered" onChange={handleLanguageChange}>
                            <option value="en">EN</option>
                            <option value="ru">RU</option>
                            <option value="tj">TJ</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col items-center md:flex-row md:items-center">
                    <img src={aoaLogo} alt="Logo" className="h-16 w-16 mb-2 md:mb-0 md:mr-2" /> {/* Increased icon size */}
                    <span className="text-2xl font-bold text-center md:text-left">{t('header.title')}</span> {/* Translated Text */}
                </div>
                <nav className="hidden md:flex space-x-6 mt-2">
                    <Link to="/dashboard" className="btn btn-outline btn-primary">{t('header.dashboard')}</Link>
                    <Link to="/standings" className="btn btn-outline btn-primary">{t('header.standings')}</Link>
                    <Link to="/profile" className="btn btn-outline btn-primary">{t('header.profile')}</Link>
                </nav>
            </header>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-base-100 shadow-md">
                    <nav className="flex flex-col space-y-2 p-4">
                        <Link to="/dashboard" className="btn btn-outline btn-primary">{t('header.dashboard')}</Link>
                        <Link to="/standings" className="btn btn-outline btn-primary">{t('header.standings')}</Link>
                        <Link to="/profile" className="btn btn-outline btn-primary">{t('header.profile')}</Link>
                    </nav>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-grow flex items-center justify-center">
                <h1 className="text-2xl">{t('dashboard.welcome')}</h1> {/* Translated Welcome Message */}
            </div>
        </div>
    );
};

export default Dashboard;
