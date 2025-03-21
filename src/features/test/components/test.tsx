import React, { useState } from 'react';
import Latex from 'react-latex'
import 'katex/dist/katex.min.css'; // Import KaTeX CSS
import { queryQuestionsWithPagination } from '@/features/test/api/get-questions'; // Adjust import path as needed
import { useDeleteQuestion } from '@/features/test/api/delete-question'; // Import useDeleteQuestion hook
import { useSearchParams } from 'react-router-dom';
import { SquareLoader } from '@/components/ui/loader/square-loader';
const Test: React.FC = () => {
    const [page, setPage] = useState(1);
    const [searchParams] = useSearchParams();
    const unitNumber = Number(searchParams.get('unit')) || 1;
    const weekNumber = Number(searchParams.get('week')) || 1;
    const parsedUnitNumber = unitNumber ? Number(unitNumber) : undefined;
    const parsedWeekNumber = weekNumber ? Number(weekNumber) : undefined;
    const { data, isLoading, isError, error } = queryQuestionsWithPagination(parsedWeekNumber, parsedUnitNumber); // Add refetch for refreshing data after deletion

    const deleteQuestionMutation = useDeleteQuestion();

    // Function to handle question deletion
    const handleDelete = async (id?: number) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            try {
                await deleteQuestionMutation.mutateAsync(id);
                alert(`Question ${id} deleted successfully.`);
            } catch (error) {
                console.error('Error deleting question:', error);
                alert('Failed to delete the question.');
            }
        }
    };

    if (isLoading) {
        return <SquareLoader/>
    }

    if (isError) {
        return <div>{error instanceof Error ? error.message : 'Error fetching questions'}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {/* Page Title */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">Unit {unitNumber}</h1> {/* Dynamic Unit */}
                <h2 className="text-xl text-gray-600">Week {weekNumber}</h2> {/* Dynamic Week */}
            </div>

            {/* Math Tests Section */}
            <div className="space-y-4">
                {data?.items.map((question, index) => (
                    <div key={index} className="border p-4 rounded">
                        <h1 className='text-center'>Test id: {question.id}</h1>
                        <p className="font-semibold">
                            EN: <Latex>{question.questionEn}</Latex>
                        </p>

                        <p className="font-semibold">
                            RU: <Latex>{question.questionRu}</Latex>
                        </p>
                        <p className="font-semibold">
                            TJ: <Latex>{question.questionTj}</Latex>
                        </p>
                        <img src={`https://goodstorage.blob.core.windows.net/algorithm-questions/${question.imageId}`} alt="" />
                        {/* Options Section */}
                        <div className="flex flex-col">
                            <h1>EN</h1>
                            {question.optionsEn.map((option, optIndex) => (
                                <label key={optIndex}>
                                    <span className='pr-2'>{optIndex}</span>
                                    <input type="radio" name={`question${index + 1}`} value={optIndex} /> {option}
                                </label>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <h1>RU</h1>
                            {question.optionsRu.map((option, optIndex) => (
                                <label key={optIndex}>
                                    <span className='pr-2'>{optIndex}</span>
                                    <input type="radio" name={`question${index + 1}`} value={optIndex} /> {option}
                                </label>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <h1>TJ</h1>
                            {question.optionsTj.map((option, optIndex) => (
                                <label key={optIndex}>
                                    <span className='pr-2'>{optIndex}</span>
                                    <input type="radio" name={`question${index + 1}`} value={optIndex} /> {option}
                                </label>
                            ))}
                        </div>
                        <h1 className='text-center'>Answer index: {question.answerId}; Week: {question.weekNumber}; Unit: {question.unitNumber}; Grade: {question.grade} </h1>

                        {/* Delete Button */}
                        <div className="text-right mt-4">
                            <button
                                onClick={() => handleDelete(question.id)}
                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-6">
                <button
                    className="btn btn-secondary"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => setPage(page + 1)}
                    disabled={page * 10 >= 10}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Test;
