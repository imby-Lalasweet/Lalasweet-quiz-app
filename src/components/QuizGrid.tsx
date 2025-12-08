'use client';

import { motion } from 'framer-motion';
import { Quiz } from '@/data/quizzes';
import { cn } from '@/lib/utils';
import { Check, Star } from 'lucide-react';

interface QuizGridProps {
    quizzes: Quiz[];
    completedIds: number[];
    onSelect: (id: number) => void;
}

export function QuizGrid({ quizzes, completedIds, onSelect }: QuizGridProps) {
    return (
        <div className="grid grid-cols-4 gap-4 md:gap-6 w-full max-w-2xl mx-auto p-4 perspective-1000">
            {quizzes.map((quiz, index) => {
                const isCompleted = completedIds.includes(quiz.id);

                return (
                    <motion.button
                        key={quiz.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: index * 0.05,
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                        whileHover={!isCompleted ? { scale: 1.05, zIndex: 10 } : {}}
                        whileTap={!isCompleted ? { scale: 0.95 } : {}}
                        onClick={() => !isCompleted && onSelect(quiz.id)}
                        disabled={isCompleted}
                        className={cn(
                            "relative aspect-square rounded-xl flex items-center justify-center text-3xl font-bold transition-all duration-300 shadow-lg border-2",
                            isCompleted
                                ? "bg-slate-800/50 border-slate-700 text-slate-600 cursor-not-allowed grayscale"
                                : "bg-slate-800/80 border-indigo-500/50 hover:border-indigo-400 hover:shadow-indigo-500/30 hover:bg-slate-700 text-white cursor-pointer backdrop-blur-sm group"
                        )}
                    >
                        {isCompleted ? (
                            <Check className="w-10 h-10 opacity-50" />
                        ) : (
                            <span className="group-hover:text-indigo-300 transition-colors drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                                {quiz.id}
                            </span>
                        )}

                        {!isCompleted && (
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
