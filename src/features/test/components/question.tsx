import React, { useState } from 'react'; // Import React and useState

// Define a type for formData
type FormData = {
    question_tj: string;
    question_en: string;
    question_ru: string;
    options_tj: string[];
    options_en: string[];
    options_ru: string[];
    week_number: number;
    grade: number;
    answer_id: number;
    [key: string]: any; // Add index signature
};

const QuestionForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        question_tj: '',
        question_en: '',
        question_ru: '',
        options_tj: ['', '', '', ''], // Four options for TJ
        options_en: ['', '', '', ''], // Four options for EN
        options_ru: ['', '', '', ''], // Four options for RU
        week_number: 1,
        grade: 1,
        answer_id: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: 'options_tj' | 'options_en' | 'options_ru') => {
        const newOptions = [...formData[field]];
        newOptions[index] = e.target.value;
        setFormData({ ...formData, [field]: newOptions });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., API call)
        console.log('Form submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-xl font-bold mb-4">Create a Question</h2>
            <div className="mb-4">
                <label className="block font-semibold">Question (TJ):</label>
                <textarea className="w-full p-2 border rounded-lg" value={formData.question_tj} onChange={(e) => handleChange(e, 'question_tj')} required />
            </div>
            <div className="mb-4">
                <label className="block font-semibold">Question (EN):</label>
                <textarea className="w-full p-2 border rounded-lg" value={formData.question_en} onChange={(e) => handleChange(e, 'question_en')} required />
            </div>
            <div className="mb-4">
                <label className="block font-semibold">Question (RU):</label>
                <textarea className="w-full p-2 border rounded-lg" value={formData.question_ru} onChange={(e) => handleChange(e, 'question_ru')} required />
            </div>
            {['options_tj', 'options_en', 'options_ru'].map((field, langIndex) => (
                <div key={field} className="mb-4">
                    <label className="block font-semibold">Options ({field === 'options_tj' ? 'TJ' : field === 'options_en' ? 'EN' : 'RU'}):</label>
                    {formData[field].map((option: string, index: number) => (  // Specify type for option
                        <input key={index} className="w-full p-2 border rounded-lg mb-2" value={option} onChange={(e) => handleArrayChange(e, index, field)} required />
                    ))}
                </div>
            ))}
            <div className="mb-4">
                <label className="block font-semibold">Week Number:</label>
                <select className="w-full p-2 border rounded-lg" value={formData.week_number} onChange={(e) => handleChange(e, 'week_number')} required>
                    {[...Array(12).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>Week {num + 1}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block font-semibold">Grade:</label>
                <select className="w-full p-2 border rounded-lg" value={formData.grade} onChange={(e) => handleChange(e, 'grade')} required>
                    {[...Array(12).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>Grade {num + 1}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block font-semibold">Answer ID:</label>
                <input type="number" className="w-full p-2 border rounded-lg" value={formData.answer_id} onChange={(e) => handleChange(e, 'answer_id')} required />
            </div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">Submit</button>
        </form>
    );
};

export default QuestionForm; // Export the component
