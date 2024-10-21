import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import aoaLogo from '../../../assets/aoa-logo-notext.png'; // Adjust the path based on your folder structure
import userIcon from '../../../assets/user-icon.png'; // Adjust the path for user icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faBook } from '@fortawesome/free-solid-svg-icons'; // Import a book icon for units
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'; 
import { useLogout, useUser } from '@/lib/auth';

const Dashboard: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    const navigate = useNavigate();
    const user = useUser();
    const logout = useLogout('/login');

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(event.target.value);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
    };

    

    // Example unit completion status (true for completed, false for not)
    const unitCompletionStatus = Array(8).fill(false);
    unitCompletionStatus[0] = true; // Example: Unit 3 is completed
    unitCompletionStatus[1] = true; // Example: Unit 6 is completed

    const weeks = [t('weeks.week1'), t('weeks.week2'), t('weeks.week3'), t('weeks.week4')]; // Translated Week Names
    const subjects = [t('subjects.polynomials')]; // Translated Subject Name

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
                    <div className="absolute right-4 flex items-center">
                        <select className="select select-bordered mr-2" onChange={handleLanguageChange}>
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
                    <button onClick={() => logout()} className="btn btn-outline btn-error">
                        {t('header.logout')}
                    </button>
                </nav>
            </header>

            {/* Hamburger Menu */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-base-100 shadow-md z-50"> {/* Positioned above content */}
                    <nav className="flex flex-col space-y-2 p-4">
                        <Link to="/dashboard" className="btn btn-outline btn-primary">{t('header.dashboard')}</Link>
                        <Link to="/standings" className="btn btn-outline btn-primary">{t('header.standings')}</Link>
                        <Link to="/profile" className="btn btn-outline btn-primary">{t('header.profile')}</Link>
                        <button onClick={() => logout()} className="btn btn-outline btn-error">
                            {t('header.logout')}
                        </button>
                    </nav>
                </div>
            )}

            {/* User Info and Units Section */}
            <div className="flex flex-col items-center justify-center p-4 bg-base-200 md:flex-row md:justify-between">
                {/* User Info */}
                <div className="flex items-center justify-center flex-col text-center mb-4 md:mb-0">
                    <img src={userIcon} alt="User Icon" className="h-10 w-10 mb-2" />
                    <div>
                        <span className="font-bold">{user ? `${user.data?.data?.firstname} ${user.data?.data?.lastname}` : 'Loading...'}</span>
                        <div className="text-sm">{t('user.grade')}: {user ? user.data?.data?.grade : ''}</div>
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
                        {t('user.score')}: {user ? user.data?.data?.totalScore : ''}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow flex flex-col md:flex-row">
                {/* Left Side List for Mobile */}
                <div className="md:hidden p-4"> {/* Mobile Dropdown */}
                    <button onClick={toggleDropdown} className="btn btn-outline btn-primary w-full">
                        {t('header.weeks')} {/* Button text for dropdown */}
                    </button>
                    {isDropdownOpen && (
                        <div className="flex flex-col space-y-2 mt-2">
                            {weeks.map((week, index) => (
                                <button key={index} className="flex flex-col items-center p-4 border rounded-lg hover:bg-blue-100 transition duration-200">
                                    <span className="text-lg font-bold">{week}</span> {/* Week Name */}
                                    <span className="text-sm text-gray-600">{subjects[0]}</span> {/* Subject Name */}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Left Side List for Desktop */}
                <div className="hidden md:w-1/3 md:p-4 md:flex md:flex-col md:space-y-4"> {/* Allocating 1/3 of the page */}
                    {weeks.map((week, index) => (
                        <button key={index} className="flex flex-col items-center p-4 border rounded-lg hover:bg-blue-100 transition duration-200">
                            <span className="text-lg font-bold">{week}</span> {/* Week Name */}
                            <span className="text-sm text-gray-600">{subjects[0]}</span> {/* Subject Name */}
                        </button>
                    ))}
                </div>

                {/* Right Side Empty Space */}
                <div className="flex-grow p-4"> {/* Remaining space for future changes */}
                    <div className="flex flex-col items-center mb-4"> {/* Centering container */}
                        <button className="btn btn-primary mb-2" onClick={() => navigate('/test')}>{t('pass_test')}</button> {/* Button to pass the test */}
                        <a href="/path/to/file" className="flex items-center"> {/* File download link */}
                            <FontAwesomeIcon icon={faFileDownload} className="mr-2" /> {/* Download icon */}
                            {t('download_file')} {/* Multilanguage support */}
                        </a>
                    </div>
                    <table className="min-w-full border-collapse border border-gray-200">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">{t('header_1')}</th>
                                <th className="border border-gray-300 p-2">{t('header_2')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2">{t('data_1')}</td>
                                <td className="border border-gray-300 p-2">{t('data_2')}</td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
