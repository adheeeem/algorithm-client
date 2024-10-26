import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import aoaLogo from '../../../assets/aoa-logo-notext.png'; // Adjust the path based on your folder structure
import userIcon from '../../../assets/user-icon.png'; // Adjust the path for user icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faBook } from '@fortawesome/free-solid-svg-icons'; // Import a book icon for units
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { useLogout, useUser } from '@/lib/auth';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'; // Add this import at the top of the file
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'; // Add this import

const Dashboard: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const logout = useLogout();
    const user = useUser();
    const [selectedUnit, setSelectedUnit] = useState<number>(1); // Set default to 1
    const [activeWeek, setActiveWeek] = useState(0); // Add this state for tracking active week

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(event.target.value);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
    };

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    // Example unit completion status (true for completed, false for not)
    const unitCompletionStatus = [false, false, false, false, false, false, false, false]; // 8 units

    useEffect(() => {
        // Any side effects you want to run when the component mounts or when selectedUnit changes
    }, [selectedUnit]);

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
                    <button onClick={handleLogout} className="btn btn-outline btn-error">
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
                        <button onClick={handleLogout} className="btn btn-outline btn-error">
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
                                className={`h-10 w-10 rounded-full flex items-center justify-center transition duration-200 ${selectedUnit === index + 1
                                        ? 'bg-blue-600 text-white'
                                        : isCompleted
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white border-2 border-blue-500 text-blue-500'
                                    } hover:bg-blue-100`}
                                title={t('unit.label', { unitNumber: index + 1 })}
                                onClick={() => setSelectedUnit(index + 1)}
                            >
                                <FontAwesomeIcon icon={faBook} className="h-6 w-6" />
                            </button>
                            <span className="text-xs mt-1">{t('unit.label', { unitNumber: index + 1 })}</span>
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
            {selectedUnit && (
                <div className="flex flex-col items-center justify-center pt-4 mb-4">
                    <h2 className="text-2xl font-bold mb-2 flex items-center">
                        <FontAwesomeIcon icon={faBookOpen} className="mr-2 text-blue-500" />
                        {t('unit.selected', { unitNumber: selectedUnit })}
                    </h2>
                    <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
                </div>
            )}
            <div className="flex-grow flex flex-col md:flex-row">
                {/* Left Side List for Mobile */}
                <div className="md:hidden p-4">
                    <button onClick={toggleDropdown} className="btn btn-outline btn-primary w-full">
                        {t('header.weeks')}
                    </button>
                    {isDropdownOpen && (
                        <div className="flex flex-col space-y-2 mt-2">
                            {weeks.map((week, index) => (
                                <button 
                                    key={index} 
                                    className={`flex items-center p-3 rounded-lg transition duration-200 ${
                                        activeWeek === index 
                                            ? 'bg-blue-500 text-white shadow-md' 
                                            : 'bg-white hover:bg-blue-50 border border-gray-200'
                                    }`}
                                    onClick={() => setActiveWeek(index)}
                                >
                                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-3 text-lg" />
                                    <div className="flex flex-col items-start">
                                        <span className="font-semibold">{week}</span>
                                        <span className="text-xs opacity-75">{subjects[0]}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Left Side List for Desktop */}
                <div className="hidden md:w-1/3 md:p-4 md:flex md:flex-col md:space-y-3">
                    
                    {weeks.map((week, index) => (
                        <button 
                            key={index} 
                            className={`flex items-center p-4 rounded-lg transition duration-200 ${
                                activeWeek === index 
                                    ? 'bg-blue-500 text-white shadow-md transform scale-105' 
                                    : 'bg-white hover:bg-blue-50 border border-gray-200'
                            }`}
                            onClick={() => setActiveWeek(index)}
                        >
                            <FontAwesomeIcon icon={faCalendarAlt} className={`mr-4 text-xl ${
                                activeWeek === index ? 'text-white' : 'text-blue-500'
                            }`} />
                            <div className="flex flex-col items-start">
                                <span className="font-semibold text-lg">{week}</span>
                                <span className="text-sm opacity-75">{subjects[0]}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Right Side Content */}
                <div className="flex-grow p-4">
                    <h3 className="text-xl font-bold mb-4">{weeks[activeWeek]}</h3>
                    <div className="flex flex-col items-center mb-4">
                        <button className="btn btn-primary mb-2" onClick={() => navigate('/test')}>{t('pass_test')}</button>
                        <a href="/path/to/file" className="flex items-center">
                            <FontAwesomeIcon icon={faFileDownload} className="mr-2" />
                            {t('download_file')}
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
