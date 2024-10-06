import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS

const Test: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            {/* Page Title */}
            <div className="text-center mb-6"> {/* Centering the title and subtitle */}
                <h1 className="text-3xl font-bold">Unit 1</h1> {/* Main title */}
                <h2 className="text-xl text-gray-600">Week 2</h2> {/* Subtitle with different font size */}
            </div>

            {/* Math Tests Section */}
            <div className="space-y-4"> {/* Spacing between tests */}
                <div className="border p-4 rounded"> {/* Individual test container */}
                    <p className="font-semibold">Test 1: What is <InlineMath math="2 + 2" />?</p> {/* Question with LaTeX */}
                    <div className="flex flex-col">
                        <label>
                            <input type="radio" name="question1" value="1" /> 3
                        </label>
                        <label>
                            <input type="radio" name="question1" value="2" /> 4
                        </label>
                        <label>
                            <input type="radio" name="question1" value="3" /> 5
                        </label>
                        <label>
                            <input type="radio" name="question1" value="4" /> 6
                        </label>
                    </div>
                </div>

                <div className="border p-4 rounded"> {/* Another test container */}
                    <p className="font-semibold">Test 2: What is <InlineMath math="5 - 3" />?</p> {/* Question with LaTeX */}
                    <div className="flex flex-col">
                        <label>
                            <input type="radio" name="question2" value="1" /> 1
                        </label>
                        <label>
                            <input type="radio" name="question2" value="2" /> 2
                        </label>
                        <label>
                            <input type="radio" name="question2" value="3" /> 3
                        </label>
                        <label>
                            <input type="radio" name="question2" value="4" /> 4
                        </label>
                    </div>
                </div>

                {/* Add more questions as needed */}
                <div className="border p-4 rounded"> {/* Complex test container */} 
                    <p className="font-semibold">Test 3: What is <InlineMath math="\frac{1}{2} + \frac{1}{3}" />?</p> {/* Question with LaTeX */}
                    <div className="flex flex-col">
                        <label>
                            <input type="radio" name="question3" value="1" /> 0.5
                        </label>
                        <label>
                            <input type="radio" name="question3" value="2" /> 0.833
                        </label>
                        <label>
                            <input type="radio" name="question3" value="3" /> 0.666
                        </label>
                        <label>
                            <input type="radio" name="question3" value="4" /> 0.25
                        </label>
                    </div>
                </div>

                <div className="border p-4 rounded"> {/* Another complex test container */} 
                    <p className="font-semibold">Test 4: What is <InlineMath math="\sqrt{16} + \sqrt{9}" />?</p> {/* Question with LaTeX */}
                    <div className="flex flex-col">
                        <label>
                            <input type="radio" name="question4" value="1" /> 5
                        </label>
                        <label>
                            <input type="radio" name="question4" value="2" /> 7
                        </label>
                        <label>
                            <input type="radio" name="question4" value="3" /> 6
                        </label>
                        <label>
                            <input type="radio" name="question4" value="4" /> 8
                        </label>
                    </div>
                </div>

                {/* Add more questions as needed */}
            </div>

            {/* Finish Button */}
            <div className="text-center mt-6"> {/* Centering the button */}
                <button className="btn btn-primary">Finish</button> {/* Finish button */}
            </div>
        </div>
    );
};

export default Test;
