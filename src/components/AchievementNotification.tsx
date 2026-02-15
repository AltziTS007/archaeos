'use client';

import React, { useEffect, useState } from 'react';
import { Achievement } from '@/data/achievements';
import { X, Sparkles } from 'lucide-react';
import { soundManager } from '@/utils/soundManager';

interface AchievementNotificationProps {
    achievement: Achievement | null;
    onClose: () => void;
}

export default function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (achievement) {
            setIsVisible(true);
            soundManager.playConquest();

            // Auto-dismiss after 5 seconds
            const timer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(onClose, 300); // Wait for animation
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [achievement, onClose]);

    if (!achievement) return null;

    return (
        <div
            className={`fixed top-6 right-6 z-50 transition-all duration-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                }`}
        >
            <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 p-1 rounded-2xl shadow-2xl animate-glow">
                <div className="bg-white rounded-xl p-5 max-w-sm">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="text-5xl animate-bounce-slow">{achievement.icon}</div>
                            <div>
                                <h3 className="font-cinzel font-bold text-xl text-gray-900 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-yellow-500" />
                                    Επίτευγμα!
                                </h3>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setIsVisible(false);
                                setTimeout(onClose, 300);
                            }}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-cinzel font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                            {achievement.nameGreek}
                        </h4>
                        <p className="text-gray-600 text-sm">
                            {achievement.descriptionGreek}
                        </p>
                        {achievement.reward > 0 && (
                            <div className="flex items-center gap-2 mt-3 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
                                <span className="text-2xl">🎁</span>
                                <span className="font-bold text-purple-600">
                                    +{achievement.reward} XP Bonus!
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
