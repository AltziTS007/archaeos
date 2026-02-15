'use client';

import React, { useState, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { achievements } from '@/data/achievements';
import AchievementNotification from './AchievementNotification';

export default function AchievementManager() {
    const { unlockedAchievements } = useGameStore();
    const [currentAchievement, setCurrentAchievement] = useState<typeof achievements[0] | null>(null);
    const [previousUnlocked, setPreviousUnlocked] = useState<string[]>([]);

    useEffect(() => {
        // Check if new achievements were unlocked
        const newAchievements = unlockedAchievements.filter(
            (id) => !previousUnlocked.includes(id)
        );

        if (newAchievements.length > 0) {
            // Show the first new achievement
            const achievement = achievements.find((a) => a.id === newAchievements[0]);
            if (achievement) {
                setCurrentAchievement(achievement);
            }
            setPreviousUnlocked(unlockedAchievements);
        }
    }, [unlockedAchievements, previousUnlocked]);

    return (
        <AchievementNotification
            achievement={currentAchievement}
            onClose={() => setCurrentAchievement(null)}
        />
    );
}
