'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quiz } from '@/data/quizzes';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface QuizViewProps {
    quiz: Quiz;
    onBack: () => void;
}

export function QuizView({ quiz, onBack }: QuizViewProps) {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto w-full p-6 flex flex-col items-center justify-center min-h-[60vh]"
        >
            <div className="w-full bg-slate-900/50 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-slate-700 shadow-2xl relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <span className="text-9xl font-black text-white">{quiz.id}</span>
                </div>

                <div className="relative z-10 space-y-8 text-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-2xl md:text-3xl font-semibold text-indigo-300 font-mono"
                    >
                        Question {quiz.id}
                    </motion.h2>

                    <div className="py-8">
                        <h1 className="text-3xl md:text-5xl font-bold text-white leading-relaxed">
                            {quiz.question}
                        </h1>
                        {quiz.image && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                                src={quiz.image}
                                alt="Quiz"
                                className="mt-8 rounded-lg max-h-60 mx-auto border-2 border-slate-600"
                            />
                        )}
                    </div>

                    <div className="pt-8 space-y-6">
                        <AnimatePresence mode="wait">
                            {showAnswer ? (
                                <motion.div
                                    key="answer"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-emerald-900/30 border border-emerald-500/30 rounded-xl p-6"
                                >
                                    <p className="text-emerald-400 font-bold text-xl md:text-2xl">
                                        {quiz.answer}
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="placeholder"
                                    className="h-20 flex items-center justify-center"
                                >
                                    <span className="text-slate-500 italic">Answer hidden...</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowAnswer(!showAnswer)}
                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors shadow-lg shadow-indigo-500/20"
                            >
                                {showAnswer ? <EyeOff size={20} /> : <Eye size={20} />}
                                {showAnswer ? 'Hide Answer' : 'Show Answer'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={onBack}
                className="mt-8 group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
                <div className="p-2 rounded-full bg-slate-800 group-hover:bg-slate-700 transition-colors">
                    <ArrowLeft size={24} />
                </div>
                <span className="text-lg">Back to Grid</span>
            </motion.button>
        </motion.div>
    );
}
