'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { X, BookOpen, Trophy, Sparkles, Star } from 'lucide-react';
import QuizComponent from './QuizComponent';
import ConfettiEffect from './ConfettiEffect';
import Image from 'next/image';
import { soundManager } from '@/utils/soundManager';

export default function SiteDrawer() {
    const {
        selectedSite,
        selectSite,
        isQuizActive,
        setQuizActive,
        addXP,
        markSiteVisited,
        visitedSites,
        setAvatarMessage,
    } = useGameStore();

    const [showConfetti, setShowConfetti] = useState(false);

    if (!selectedSite) return null;

    const isAlreadyVisited = visitedSites.includes(selectedSite.id);

    const handleStartQuiz = () => {
        soundManager.playClick();
        setQuizActive(true);
        setAvatarMessage('Ας δούμε τι έμαθες! Καλή επιτυχία! 🎯', true);
    };

    const handleQuizComplete = (score: number, passed: boolean) => {
        // Record quiz result for achievement tracking
        const { recordQuizResult, checkAchievements } = useGameStore.getState();
        recordQuizResult(selectedSite.id, score, passed);

        if (passed && !isAlreadyVisited) {
            // Award XP and mark site as visited
            addXP(100);
            markSiteVisited(selectedSite.id);
            setShowConfetti(true);
            soundManager.playConquest(); // Victory sound!

            // Check for newly unlocked achievements
            const newAchievements = checkAchievements();

            setAvatarMessage(
                `🎉 Εξαιρετικά! Κέρδισες 100 XP! Το ${selectedSite.name} είναι τώρα κατακτημένο!`,
                true
            );

            setTimeout(() => setShowConfetti(false), 3500);
        } else if (passed && isAlreadyVisited) {
            setAvatarMessage('✨ Τέλεια! Αλλά έχεις ήδη κατακτήσει αυτό το μνημείο!', true);
        } else {
            setAvatarMessage('💪 Μην ανησυχείς! Δοκίμασε ξανά αργότερα!', true);
        }

        // Close quiz after a delay
        setTimeout(() => {
            setQuizActive(false);
        }, 2000);
    };

    const handleClose = () => {
        selectSite(null);
        setQuizActive(false);
        setAvatarMessage('🗺️ Επίλεξε άλλο μνημείο για να συνεχίσεις την εξερεύνηση!', false);
    };

    return (
        <>
            <ConfettiEffect trigger={showConfetti} />

            <div className="fixed right-0 top-0 h-full w-full md:w-[550px] bg-gradient-to-br from-white via-blue-50 to-purple-50 shadow-2xl z-40 overflow-y-auto animate-slide-in-right custom-scrollbar">
                {/* Header with gradient */}
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white p-6 flex items-center justify-between shadow-lg">
                    <h2 className="text-2xl md:text-3xl font-cinzel flex items-center gap-3">
                        <BookOpen className="w-7 h-7" />
                        {selectedSite.name}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-all"
                        aria-label="Κλείσιμο"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Site image with fun border */}
                    <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-gradient">
                        <Image
                            src={selectedSite.imageUrl}
                            alt={selectedSite.name}
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 550px"
                            priority
                        />
                        {isAlreadyVisited && (
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
                                <Trophy className="w-5 h-5" />
                                Κατακτημένο!
                            </div>
                        )}
                        {!isAlreadyVisited && (
                            <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
                                <Star className="w-5 h-5" />
                                Νέο!
                            </div>
                        )}
                    </div>

                    {/* Hide site information during quiz to prevent cheating */}
                    {!isQuizActive && (
                        <>
                            {/* Description */}
                            <div className="glass p-5 rounded-2xl shadow-lg">
                                <p className="text-gray-700 leading-relaxed text-lg font-inter">
                                    {selectedSite.description}
                                </p>
                            </div>

                            {/* Historical facts with colorful design */}
                            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-5 rounded-2xl border-l-4 border-orange-400 shadow-lg">
                                <h3 className="font-cinzel text-orange-600 mb-4 flex items-center gap-2 text-xl">
                                    📜 Ιστορικά Στοιχεία
                                </h3>
                                <ul className="space-y-3">
                                    {selectedSite.historicalFacts.map((fact, index) => (
                                        <li key={index} className="text-gray-700 font-inter flex items-start gap-3 hover:translate-x-2 transition-transform">
                                            <span className="text-2xl">🏛️</span>
                                            <span className="pt-1">{fact}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}

                    {/* Quiz section with exciting button */}
                    {!isQuizActive ? (
                        <button
                            onClick={handleStartQuiz}
                            className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:from-green-500 hover:via-blue-600 hover:to-purple-700 text-white font-cinzel text-xl py-5 px-6 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl flex items-center justify-center gap-3"
                        >
                            <Trophy className="w-6 h-6" />
                            Ξεκίνα το Κουίζ! 🎯
                            <Sparkles className="w-6 h-6" />
                        </button>
                    ) : (
                        <div className="glass p-6 rounded-2xl shadow-xl">
                            <QuizComponent
                                questions={selectedSite.quiz}
                                onComplete={handleQuizComplete}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
