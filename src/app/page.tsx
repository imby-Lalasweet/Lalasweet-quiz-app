'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { QUIZZES, CATEGORIES } from '@/data/quizzes';
import { QuizGrid } from '@/components/QuizGrid';
import { QuizView } from '@/components/QuizView';
/* eslint-disable @next/next/no-img-element */

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
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0B1120] to-black">
      {/* Background ambient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-[90rem] mx-auto flex flex-col items-center">
        <header className="mb-4 md:mb-8 text-center w-full">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-2"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="h-6 md:h-10 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            />
            <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-purple-200 drop-shadow-2xl whitespace-nowrap">
              AI 낭독 퀴즈
            </h1>
          </motion.div>

          {!activeQuizId && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-indigo-200/80 text-xl md:text-2xl font-light tracking-wide"
            >
              번호를 선택하세요
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <QuizGrid
                quizzes={QUIZZES}
                categories={CATEGORIES}
                completedIds={completedIds}
                onSelect={handleSelectQuiz}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="fixed bottom-4 text-slate-700/50 text-sm font-mono tracking-widest pointer-events-none">
        2025 YEAR END PARTY
      </footer>
    </main>
  );
}
