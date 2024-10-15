import React from 'react';
import { useState } from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS
import { queryQuestionsWithPagination } from '@/features/test/api/get-questions'; // Adjust import path as needed
import { useParams } from 'react-router-dom';

const Test: React.FC = () => {
    const [page, setPage] = useState(1);
    const { unitNumber, weekNumber } = useParams<{ unitNumber: string; weekNumber: string }>();
    const parsedUnitNumber = unitNumber ? Number(unitNumber) : undefined;
    const parsedWeekNumber = weekNumber ? Number(weekNumber) : undefined;
    const { data, isLoading, isError } = queryQuestionsWithPagination(parsedWeekNumber, parsedUnitNumber);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching questions</div>;
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
                        <p className="font-semibold">
                            Test {index + 1}: <BlockMath math={question.questionEn}/>
                        </p>
                        <div className="flex flex-col">
                            {question.optionsEn.map((option, optIndex) => (
                                <label key={optIndex}>
                                    <input type="radio" name={`question${index + 1}`} value={optIndex} /> {option}
                                </label>
                            ))}
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
