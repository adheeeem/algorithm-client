import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // Import Link for navigation
import aoaLogo from '../../../assets/aoa-logo-notext.png'; // Adjust the path based on your folder structure
import userIcon from '../../../assets/user-icon.png'; // Adjust the path for user icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faBook } from '@fortawesome/free-solid-svg-icons'; // Import a book icon for units

const Dashboard: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(event.target.value);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
    };

    // Example unit completion status (true for completed, false for not)
    const unitCompletionStatus = Array(8).fill(false);
    unitCompletionStatus[0] = true; // Example: Unit 3 is completed
    unitCompletionStatus[1] = true; // Example: Unit 6 is completed

    return (
        <div className="flex flex-col h-screen relative"> {/* Added relative positioning */}
            {/* Header */}
            <header className="flex flex-col items-center justify-between p-4 bg-gray-800 text-white shadow-md">
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

            {/* Hamburger Menu */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-base-100 shadow-md z-50"> {/* Positioned above content */}
                    <nav className="flex flex-col space-y-2 p-4">
                        <Link to="/dashboard" className="btn btn-outline btn-primary">{t('header.dashboard')}</Link>
                        <Link to="/standings" className="btn btn-outline btn-primary">{t('header.standings')}</Link>
                        <Link to="/profile" className="btn btn-outline btn-primary">{t('header.profile')}</Link>
                    </nav>
                </div>
            )}

            {/* User Info and Units Section */}
            <div className="flex flex-col items-center justify-center p-4 bg-base-200 md:flex-row md:justify-between">
                {/* User Info */}
                <div className="flex items-center justify-center flex-col text-center mb-4 md:mb-0">
                    <img src={userIcon} alt="User Icon" className="h-10 w-10 mb-2" /> {/* User Icon */}
                    <div>
                        <span className="font-bold">John Doe</span> {/* Full Name */}
                        <div className="text-sm">{t('user.grade')}: 10</div> {/* Grade */}
                    </div>
                </div>

                {/* Units Icons */}
                <div className="flex flex-wrap justify-center space-x-2 mt-2 md:mt-0">
                    {unitCompletionStatus.map((isCompleted, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <button
                                className={`h-10 w-10 rounded-full flex items-center justify-center transition duration-200 ${
                                    isCompleted ? 'bg-blue-500 text-white' : 'bg-white border-2 border-blue-500 text-blue-500'
                                } hover:bg-blue-100`}
                                title={t('unit.label', { unitNumber: index + 1 })}
                            >
                                <FontAwesomeIcon icon={faBook} className="h-6 w-6" /> {/* Unit Icon */}
                            </button>
                            <span className="text-xs">{t('unit.label', { unitNumber: index + 1 })}</span> {/* Unit Label */}
                        </div>
                    ))}
                </div>

                {/* Score */}
                <div className="text-lg font-bold text-center mt-2 md:mt-0">
                    <div className="bg-blue-500 text-white rounded-lg p-2">
                        {t('user.score')}: 95 {/* Example Score */}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow flex items-center justify-center">
                <h1 className="text-2xl">{t('dashboard.welcome')}</h1> {/* Translated Welcome Message */}
            </div>
        </div>
    );
};

export default Dashboard;