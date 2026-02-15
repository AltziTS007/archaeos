'use client';

import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { QuizQuestion } from '@/types';
import { soundManager } from '@/utils/soundManager';

interface QuizComponentProps {
    questions: QuizQuestion[];
    onComplete: (score: number, passed: boolean) => void;
}

export default function QuizComponent({ questions, onComplete }: QuizComponentProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);

    const question = questions[currentQuestion];
    const isLastQuestion = currentQuestion === questions.length - 1;

    const handleAnswerSelect = (answerIndex: number) => {
        if (showFeedback) return; // Prevent changing answer after submission

        setSelectedAnswer(answerIndex);
        const correct = answerIndex === question.correctAnswer;
        setIsCorrect(correct);
        setShowFeedback(true);

        // Play sound effect
        if (correct) {
            soundManager.playSuccess();
            setScore(score + 1);
        } else {
            soundManager.playError();
        }

        // Auto-advance after showing feedback
        setTimeout(() => {
            if (isLastQuestion) {
                const finalScore = correct ? score + 1 : score;
                const passed = finalScore >= 2; // Need 2/3 correct
                onComplete(finalScore, passed);
            } else {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
                setShowFeedback(false);
            }
        }, 2000);
    };

    return (
        <div className="space-y-6">
            {/* Progress bar */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                    <span className="text-purple-600">Ερώτηση {currentQuestion + 1} από {questions.length}</span>
                    <span className="text-green-600">Σκορ: {score}/{questions.length}</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Question */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200">
                <h3 className="text-xl font-cinzel text-gray-800 mb-4">
                    {question.question}
                </h3>

                {/* Answer options */}
                <div className="space-y-3">
                    {question.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrectAnswer = index === question.correctAnswer;
                        const showCorrect = showFeedback && isCorrectAnswer;
                        const showWrong = showFeedback && isSelected && !isCorrectAnswer;

                        return (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                disabled={showFeedback}
                                className={`w-full p-4 rounded-xl text-left font-inter transition-all duration-300 flex items-center justify-between
                                    ${!showFeedback && 'hover:scale-102 hover:shadow-lg'}
                                    ${!showFeedback && isSelected && 'ring-4 ring-blue-400'}
                                    ${!showFeedback && !isSelected && 'bg-white border-2 border-gray-200 hover:border-blue-300'}
                                    ${showCorrect && 'bg-gradient-to-r from-green-400 to-green-500 text-white border-2 border-green-600 animate-bounce-in'}
                                    ${showWrong && 'bg-gradient-to-r from-red-400 to-red-500 text-white border-2 border-red-600 animate-shake'}
                                    ${showFeedback && !isSelected && !isCorrectAnswer && 'bg-gray-100 opacity-50'}
                                `}
                            >
                                <span className="flex-1">{option}</span>
                                {showCorrect && (
                                    <Check className="w-6 h-6 animate-bounce" />
                                )}
                                {showWrong && (
                                    <X className="w-6 h-6 animate-shake" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Feedback message */}
            {showFeedback && (
                <div className={`p-4 rounded-xl text-center font-bold text-lg animate-bounce-in
                    ${isCorrect
                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                        : 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
                    }`}
                >
                    {isCorrect ? '🎉 Σωστά! Μπράβο!' : '💪 Προσπάθησε ξανά!'}
                </div>
            )}
        </div>
    );
}
