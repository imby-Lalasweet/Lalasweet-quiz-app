'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quiz } from '@/data/quizzes';
import { ArrowLeft, Eye, EyeOff, Play, Volume2 } from 'lucide-react';

interface QuizViewProps {
    quiz: Quiz;
    onBack: () => void;
}

export function QuizView({ quiz, onBack }: QuizViewProps) {
    const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
    const [showAudioControls, setShowAudioControls] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    // Cleanup audio on unmount or id change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        return () => {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
        };
    }, [currentAudio, quiz.id]);

    const playQuestionAudio = () => {
        if (!quiz.audio) return;

        // Stop any currently playing audio
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        const audio = new Audio(quiz.audio);
        audio.play().catch(e => {
            console.error("Audio play failed", e);
            alert(`오디오 파일을 찾을 수 없습니다: ${quiz.audio}`);
        });
        setCurrentAudio(audio);
        setIsPaused(false);
        setShowAudioControls(true);
    };

    const toggleAudio = () => {
        if (!currentAudio) return;

        if (isPaused) {
            currentAudio.play();
            setIsPaused(false);
        } else {
            currentAudio.pause();
            setIsPaused(true);
        }
    };

    const replayQuestionAudio = () => {
        if (currentAudio) {
            currentAudio.currentTime = 0;
            currentAudio.play();
            setIsPaused(false);
        }
    };

    // Helper for answer audio (stateless for now, or unified? User asked specifically for "Problem" buttons)
    const playAnswerAudio = (path?: string) => {
        if (!path) return;

        // Stop any currently playing audio
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        const audio = new Audio(path);
        audio.play().catch(e => console.error(e));
        setCurrentAudio(audio);
        setIsPaused(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto w-full p-4 md:p-6 flex flex-col items-center justify-center min-h-[60vh]"
        >
            <div className="w-full bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 md:p-12 border border-slate-700 shadow-2xl relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <span className="text-9xl font-black text-white">{quiz.id}</span>
                </div>

                <div className="relative z-10 space-y-8 text-center flex flex-col items-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-2xl md:text-3xl font-semibold text-indigo-300 font-mono"
                    >
                        Question {quiz.id}
                    </motion.h2>

                    <div className="py-4 space-y-4 w-full flex flex-col items-center">
                        {/* Question Text Removed as per user request */}
                        {/* <h1 className="text-3xl md:text-5xl font-bold text-white leading-relaxed whitespace-pre-line">
                            {quiz.question}
                        </h1> */}

                        {/* Question Audio Section */}
                        {quiz.audio && (
                            <div className="flex flex-col items-center gap-4 mb-4">
                                <button
                                    onClick={playQuestionAudio}
                                    className="flex items-center gap-3 px-8 py-4 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xl transition-all shadow-lg hover:shadow-indigo-500/40 hover:-translate-y-1"
                                >
                                    <Volume2 size={32} />
                                    <span>문제 듣기</span>
                                </button>

                                {/* Controls: Pause / Replay */}
                                <AnimatePresence>
                                    {showAudioControls && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="flex gap-4"
                                        >
                                            <button
                                                onClick={toggleAudio}
                                                className={`flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-lg shadow-lg hover:-translate-y-1 transition-all ${isPaused
                                                    ? 'bg-emerald-500 hover:bg-emerald-400'
                                                    : 'bg-amber-500 hover:bg-amber-400'
                                                    }`}
                                            >
                                                <span>{isPaused ? '▶ 이어 듣기' : '⏸ 일시 정지'}</span>
                                            </button>
                                            <button
                                                onClick={replayQuestionAudio}
                                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-bold text-lg shadow-lg hover:-translate-y-1 transition-all"
                                            >
                                                <span>🔄 처음부터 듣기</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {quiz.image && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                                src={quiz.image}
                                alt="Quiz"
                                className="mt-8 rounded-lg max-h-60 mx-auto border-2 border-slate-600 shadow-lg"
                            />
                        )}
                    </div>

                    <div className="pt-8 space-y-6 w-full">
                        <AnimatePresence mode="wait">
                            {showAnswer ? (
                                <motion.div
                                    key="answer"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-emerald-900/30 border border-emerald-500/30 rounded-xl p-6 flex flex-col items-center gap-4"
                                >
                                    <p className="text-emerald-400 font-bold text-xl md:text-2xl whitespace-pre-line text-center">
                                        {quiz.answer}
                                    </p>

                                    {/* Answer Image - Click to play audio if available */}
                                    {quiz.answerImage && (
                                        quiz.answerAudio ? (
                                            <button
                                                onClick={() => playAnswerAudio(quiz.answerAudio)}
                                                className="group relative rounded-xl overflow-hidden border-4 border-emerald-500/50 hover:border-emerald-400 transition-colors shadow-2xl cursor-pointer"
                                            >
                                                <img
                                                    src={quiz.answerImage}
                                                    alt="Answer"
                                                    className="max-h-80 w-auto object-contain bg-black/20"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Play size={64} className="text-white fill-white drop-shadow-lg" />
                                                </div>
                                            </button>
                                        ) : (
                                            <div className="rounded-xl overflow-hidden border-4 border-emerald-500/50 shadow-2xl">
                                                <img
                                                    src={quiz.answerImage}
                                                    alt="Answer"
                                                    className="max-h-80 w-auto object-contain bg-black/20"
                                                />
                                            </div>
                                        )
                                    )}
                                    {quiz.answerAudio && !quiz.answerImage && (
                                        <button
                                            onClick={() => playAnswerAudio(quiz.answerAudio)}
                                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg"
                                        >
                                            <Volume2 size={24} />
                                            <span>정답 음성 듣기</span>
                                        </button>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="placeholder"
                                    className="h-20 flex items-center justify-center"
                                >
                                    <span className="text-slate-500 italic text-lg">정답 화면이 숨겨져 있습니다...</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowAnswer(!showAnswer)}
                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors shadow-lg border border-slate-600"
                            >
                                {showAnswer ? <EyeOff size={20} /> : <Eye size={20} />}
                                {showAnswer ? '정답 숨기기' : '정답 보기'}
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
                <span className="text-lg">점수판으로 돌아가기</span>
            </motion.button>
        </motion.div>
    );
}
