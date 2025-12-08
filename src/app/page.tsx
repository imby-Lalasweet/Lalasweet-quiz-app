'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { QUIZZES } from '@/data/quizzes';
import { QuizGrid } from '@/components/QuizGrid';
import { QuizView } from '@/components/QuizView';

export default function Home() {
  const [activeQuizId, setActiveQuizId] = useState<number | null>(null);
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  const handleSelectQuiz = (id: number) => {
    setActiveQuizId(id);
  };

  const handleBackToGrid = () => {
    if (activeQuizId !== null) {
      setCompletedIds((prev) => Array.from(new Set([...prev, activeQuizId])));
      setActiveQuizId(null);
    }
  };

  const activeQuiz = activeQuizId ? QUIZZES.find((q) => q.id === activeQuizId) : null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        <header className="mb-8 md:mb-12 text-center space-y-2">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-lg"
          >
            <span className="text-indigo-400">Year-End</span> Quiz
          </motion.h1>
          {!activeQuizId && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg md:text-xl"
            >
              Select a number to reveal the question
            </motion.p>
          )}
        </header>

        <AnimatePresence mode="wait">
          {activeQuiz ? (
            <QuizView
              key="view"
              quiz={activeQuiz}
              onBack={handleBackToGrid}
            />
          ) : (
            <motion.div
              key="grid"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <QuizGrid
                quizzes={QUIZZES}
                completedIds={completedIds}
                onSelect={handleSelectQuiz}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="absolute bottom-4 text-slate-600 text-sm">
        Designed for 2025 Year-End Party
      </footer>
    </main>
  );
}
