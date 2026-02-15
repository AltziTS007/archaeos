'use client';

import React, { useState } from 'react';
import { achievements, Achievement } from '@/data/achievements';
import { useGameStore } from '@/store/useGameStore';
import { X, Trophy, Lock, CheckCircle, TrendingUp } from 'lucide-react';

interface AchievementsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AchievementsModal({ isOpen, onClose }: AchievementsModalProps) {
    const { unlockedAchievements } = useGameStore();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    if (!isOpen) return null;

    const categories = [
        { id: 'all', name: 'Όλα', icon: '🏆' },
        { id: 'explorer', name: 'Εξερευνητής', icon: '🗺️' },
        { id: 'knowledge', name: 'Γνώση', icon: '📚' },
        { id: 'mastery', name: 'Μαεστρία', icon: '🎯' },
        { id: 'regional', name: 'Περιοχές', icon: '🌍' },
        { id: 'speed', name: 'Ταχύτητα', icon: '⚡' },
        { id: 'xp', name: 'XP', icon: '💫' },
    ];

    const filteredAchievements =
        selectedCategory === 'all'
            ? achievements
            : achievements.filter((a) => a.category === selectedCategory);

    const unlockedCount = achievements.filter((a) =>
        unlockedAchievements.includes(a.id)
    ).length;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-cinzel font-bold flex items-center gap-3">
                                <Trophy className="w-8 h-8" />
                                Επιτεύγματα
                            </h2>
                            <p className="text-blue-100 mt-1">
                                {unlockedCount} / {achievements.length} ξεκλειδωμένα
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-full transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 bg-white/20 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-yellow-300 to-orange-300 h-full transition-all duration-500"
                            style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="p-4 border-b border-gray-200 overflow-x-auto">
                    <div className="flex gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all ${selectedCategory === category.id
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {category.icon} {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Achievements Grid */}
                <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredAchievements.map((achievement) => (
                            <AchievementCard
                                key={achievement.id}
                                achievement={achievement}
                                isUnlocked={unlockedAchievements.includes(achievement.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface AchievementCardProps {
    achievement: Achievement;
    isUnlocked: boolean;
}

function AchievementCard({ achievement, isUnlocked }: AchievementCardProps) {
    const state = useGameStore();
    const progress = achievement.progress?.(state);

    return (
        <div
            className={`p-5 rounded-2xl border-2 transition-all ${isUnlocked
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 shadow-lg'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
        >
            <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                    className={`text-5xl ${isUnlocked ? 'animate-bounce-slow' : 'grayscale opacity-50'
                        }`}
                >
                    {achievement.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="font-cinzel font-bold text-lg text-gray-900">
                            {achievement.nameGreek}
                        </h3>
                        {isUnlocked ? (
                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                        ) : (
                            <Lock className="w-6 h-6 text-gray-400 flex-shrink-0" />
                        )}
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                        {achievement.descriptionGreek}
                    </p>

                    {/* Progress Bar */}
                    {progress && !isUnlocked && (
                        <div className="mb-3">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                <span className="flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    Πρόοδος
                                </span>
                                <span className="font-bold">
                                    {progress.current} / {progress.total}
                                </span>
                            </div>
                            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
                                    style={{
                                        width: `${(progress.current / progress.total) * 100}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Reward */}
                    {achievement.reward > 0 && (
                        <div
                            className={`flex items-center gap-2 text-sm font-bold ${isUnlocked ? 'text-purple-600' : 'text-gray-400'
                                }`}
                        >
                            <span>🎁</span>
                            <span>+{achievement.reward} XP</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
