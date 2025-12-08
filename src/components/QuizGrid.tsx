'use client';

import { motion } from 'framer-motion';
import { Quiz } from '@/data/quizzes';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface QuizGridProps {
    quizzes: Quiz[];
    categories: string[];
    completedIds: number[];
    onSelect: (id: number) => void;
}

export function QuizGrid({ quizzes, categories, completedIds, onSelect }: QuizGridProps) {
    const points = ["10점", "20점", "30점", "40점"];

    return (
        <div className="w-full max-w-6xl mx-auto p-2 md:p-6 overflow-x-auto">
            {/* Grid Container */}
            <div className="min-w-[800px] grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-4 text-center">

                {/* Header Row (Empty first cell + Points) */}
                <div className="bg-transparent"></div> {/* Top-left corner placeholder */}
                {points.map((point) => (
                    <div key={point} className="flex items-center justify-center py-4 bg-indigo-600 rounded-xl border-2 border-indigo-400 shadow-xl shadow-indigo-900/50 mb-4">
                        <span className="text-2xl md:text-3xl font-black text-white font-mono tracking-widest drop-shadow-md">{point}</span>
                    </div>
                ))}

                {/* Spacer Row to separate Header from Content */}
                <div className="col-span-5 h-4"></div>

                {/* Rows: Category + 4 Quizzes */}
                {categories.map((category, rowIndex) => (
                    <>
                        {/* Category Header */}
                        <div className="flex items-center justify-center p-4 bg-slate-900/90 rounded-xl border-l-4 border-indigo-500 shadow-xl">
                            <span className="text-xl font-bold text-white break-words w-full px-2">{category}</span>
                        </div>

                        {/* Quiz Cells for this Category */}
                        {Array.from({ length: 4 }).map((_, colIndex) => {
                            // Calculate quiz index: Row(0-3) * 4 + Col(0-3) + 1 -> 1-16
                            const quizId = rowIndex * 4 + colIndex + 1;
                            const quiz = quizzes.find(q => q.id === quizId);
                            const isCompleted = completedIds.includes(quizId);

                            if (!quiz) return <div key={quizId} className="bg-transparent" />; // Safety fallback

                            return (
                                <motion.button
                                    key={quizId}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: rowIndex * 0.1 + colIndex * 0.05 }}
                                    whileHover={!isCompleted ? { scale: 1.05, y: -5 } : {}}
                                    whileTap={!isCompleted ? { scale: 0.95 } : {}}
                                    onClick={() => !isCompleted && onSelect(quizId)}
                                    disabled={isCompleted}
                                    className={cn(
                                        "relative aspect-video rounded-xl flex items-center justify-center text-3xl font-black transition-all duration-300 shadow-lg border-2 overflow-hidden group",
                                        isCompleted
                                            ? "bg-slate-800/30 border-slate-800 text-slate-700 cursor-not-allowed"
                                            : "bg-gradient-to-br from-slate-800 to-slate-900 border-indigo-500/30 hover:border-indigo-400 hover:shadow-indigo-500/20 text-white cursor-pointer"
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check className="w-12 h-12 text-slate-700 opacity-50" />
                                    ) : (
                                        <>
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 bg-indigo-500/10" />
                                            <span className="text-2xl md:text-4xl text-indigo-400 group-hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]">
                                                {quizId}
                                            </span>
                                        </>
                                    )}
                                </motion.button>
                            );
                        })}
                    </>
                ))}
            </div>
        </div>
    );
}
