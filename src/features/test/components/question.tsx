import React, { useState } from 'react';
import { Question } from '@/types/api';
import { useCreateQuestionWithOptionalImage } from '@/features/test/api/create-question';

const QuestionForm: React.FC = () => {
    const [formData, setFormData] = useState<Question>({
        questionTj: '',
        questionEn: '',
        questionRu: '',
        optionsTj: ['', '', '', ''],
        optionsEn: ['', '', '', ''],
        optionsRu: ['', '', '', ''],
        weekNumber: 1,
        grade: 1,
        unitNumber: 1, // Initialize unit_number
        answerId: 0,
    });

    const [imageFile, setImageFile] = useState<File | undefined>(undefined); // State for the image file
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const createQuestionMutation = useCreateQuestionWithOptionalImage();

    // Utility function for handling input changes
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        field: string
    ) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    // Function to handle changes in options arrays
    const handleArrayChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        field: 'optionsTj' | 'optionsEn' | 'optionsRu'
    ) => {
        const updatedOptions = [...formData[field]];
        updatedOptions[index] = e.target.value;
        setFormData((prev) => ({ ...prev, [field]: updatedOptions }));
    };

    // Function to handle image file selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file); // Store the selected file
        }
    };

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.answerId < 0 || formData.answerId > 3) {
            alert('Answer ID must be between 0 and 3');
            return;
        }

        setLoading(true);
        setMessage(null); // Reset any previous messages

        try {
            const result = await createQuestionMutation.mutateAsync({ question: formData, imageFile });

            if (result.statusCode === 200) {
                setMessage(`Question created successfully with ID: ${result.data}`);
            } else {
                setMessage(`Error occurred while creating question: ${result.message}`);
            }
        } catch (error) {
            console.error('Error creating question:', error);
            setMessage('Failed to create the question. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 border rounded-lg shadow-lg bg-gray-800 text-white">
            <h2 className="text-xl font-bold mb-4">Create a Question</h2>

            {['questionTj', 'questionEn', 'questionRu'].map((field, _) => (
                <div key={field} className="mb-4">
                    <label className="block font-semibold">{field}:</label>
                    <textarea
                        className="w-full p-2 border rounded-lg bg-gray-700 text-white"
                        value={formData[field]}
                        onChange={(e) => handleInputChange(e, field)}
                        required
                    />
                </div>
            ))}

            {(['optionsTj', 'optionsEn', 'optionsRu'] as Array<'optionsTj' | 'optionsEn' | 'optionsRu'>).map(
                (field, _) => (
                    <div key={field} className="mb-4 p-4">
                        <label className="block font-semibold">{field}:</label>
                        <div className="grid grid-cols-2 gap-2">
                            {formData[field].map((option: string, index: number) => (
                                <div key={index} className="flex items-center mb-2">
                                    <span className="mr-2">{index}.</span> {/* Number from 0 to 3 */}
                                    <input
                                        className="w-full p-2 border rounded-lg bg-gray-700 text-white"
                                        value={option}
                                        onChange={(e) => handleArrayChange(e, index, field)}
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}

            {/* Week Number Select */}
            <div className="mb-4">
                <label className="block font-semibold">Week Number:</label>
                <select
                    className="w-full p-2 border rounded-lg bg-gray-700 text-white"
                    value={formData.weekNumber}
                    onChange={(e) => handleInputChange(e, 'weekNumber')}
                    required
                >
                    {Array.from({ length: 4 }, (_, num) => (
                        <option key={num + 1} value={num + 1}>
                            Week {num + 1}
                        </option>
                    ))}
                </select>
            </div>

            {/* Unit Number Select */}
            <div className="mb-4">
                <label className="block font-semibold">Unit Number:</label>
                <select
                    className="w-full p-2 border rounded-lg bg-gray-700 text-white"
                    value={formData.unitNumber}
                    onChange={(e) => handleInputChange(e, 'unitNumber')}
                    required
                >
                    {Array.from({ length: 8 }, (_, num) => (
                        <option key={num + 1} value={num + 1}>
                            Unit {num + 1}
                        </option>
                    ))}
                </select>
            </div>

            {/* Grade Select */}
            <div className="mb-4">
                <label className="block font-semibold">Grade:</label>
                <select
                    className="w-full p-2 border rounded-lg bg-gray-700 text-white"
                    value={formData.grade}
                    onChange={(e) => handleInputChange(e, 'grade')}
                    required
                >
                    {Array.from({ length: 12 }, (_, num) => (
                        <option key={num + 1} value={num + 1}>
                            Grade {num + 1}
                        </option>
                    ))}
                </select>
            </div>

            {/* Answer ID Input */}
            <div className="mb-4">
                <label className="block font-semibold">Answer ID (0-3):</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded-lg bg-gray-700 text-white"
                    value={formData.answerId}
                    onChange={(e) => handleInputChange(e, 'answerId')}
                    min="0"
                    max="3"
                    required
                />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
                <label className="block font-semibold">Upload Image (Optional):</label>
                <input
                    type="file"
                    accept="image/*"
                    className="w-full p-2 border rounded-lg bg-gray-700 text-white"
                    onChange={handleImageChange}
                />
            </div>

            <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                disabled={loading}
            >
                {loading ? 'Submitting...' : 'Submit'}
            </button>

            {message && <p className="mt-4 text-center">{message}</p>}
        </form>
    );
};

export default QuestionForm;
