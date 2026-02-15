'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Trophy, Zap } from 'lucide-react';
import AchievementsModal from './AchievementsModal';

export default function AvatarOverlay() {
    const { xp, avatarMessage, isAvatarTalking, unlockedAchievements } = useGameStore();
    const [showAchievements, setShowAchievements] = useState(false);

    return (
        <>
            <div className="fixed bottom-6 left-6 z-30 flex flex-col items-start gap-4 max-w-md">
                {/* Avatar character with fun design */}
                <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-2xl border-4 border-white">
                        <div className="text-5xl">🏛️</div>
                    </div>

                    {/* XP Badge */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1 font-bold border-2 border-white">
                        <Zap className="w-4 h-4" />
                        {xp} XP
                    </div>
                </div>

                {/* Speech bubble with vibrant design */}
                {isAvatarTalking && avatarMessage && (
                    <div className="glass p-4 rounded-2xl shadow-2xl max-w-sm border-2 border-blue-200">
                        <div className="flex items-start gap-3">
                            <div className="text-2xl">💬</div>
                            <p className="text-gray-800 font-inter leading-relaxed">
                                {avatarMessage}
                            </p>
                        </div>
                        {/* Speech bubble pointer */}
                        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white transform rotate-45 border-r-2 border-b-2 border-blue-200"></div>
                    </div>
                )}

                {/* Progress indicator */}
                <div className="glass px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border-2 border-purple-200">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="font-bold text-purple-600">
                        Επίπεδο {Math.floor(xp / 100) + 1}
                    </span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                            style={{ width: `${(xp % 100)}%` }}
                        ></div>
                    </div>
                </div>

                {/* Achievements Button */}
                <button
                    onClick={() => setShowAchievements(true)}
                    className="glass px-6 py-3 rounded-2xl shadow-xl font-bold flex items-center gap-3 border-2 border-yellow-300 hover:scale-105 transition-transform bg-gradient-to-r from-yellow-50 to-orange-50"
                >
                    <Trophy className="w-6 h-6 text-yellow-600" />
                    <span className="text-gray-800">Επιτεύγματα</span>
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm">
                        {unlockedAchievements.length}/20
                    </span>
                </button>
            </div>

            {/* Achievements Modal */}
            <AchievementsModal
                isOpen={showAchievements}
                onClose={() => setShowAchievements(false)}
            />
        </>
    );
}
