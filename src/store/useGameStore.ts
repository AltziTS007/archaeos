import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, ArchaeologicalSite } from '@/types';
import { achievements } from '@/data/achievements';

interface GameActions {
    addXP: (amount: number) => void;
    markSiteVisited: (siteId: string) => void;
    selectSite: (site: ArchaeologicalSite | null) => void;
    setAvatarMessage: (message: string, isTalking: boolean) => void;
    setQuizActive: (isActive: boolean) => void;
    recordQuizResult: (siteId: string, score: number, passed: boolean) => void;
    unlockAchievement: (achievementId: string) => void;
    checkAchievements: () => string[]; // Returns newly unlocked achievement IDs
    resetGame: () => void;
}

const initialState: GameState = {
    xp: 0,
    visitedSites: [],
    selectedSite: null,
    isAvatarTalking: false,
    avatarMessage: 'Γεια σου! Είμαι ο οδηγός σου στην Αρχαία Ελλάδα. Επίλεξε ένα μνημείο για να ξεκινήσουμε!',
    isQuizActive: false,
    unlockedAchievements: [],
    quizzesPassed: [],
    perfectScores: [],
    consecutivePerfect: 0,
    consecutivePasses: 0,
    sitesVisitedThisSession: [],
    sessionStartTime: Date.now(),
};

export const useGameStore = create<GameState & GameActions>()(
    persist(
        (set, get) => ({
            ...initialState,

            addXP: (amount: number) => {
                set((state) => ({
                    xp: state.xp + amount,
                }));
                // Check for XP milestone achievements
                get().checkAchievements();
            },

            markSiteVisited: (siteId: string) =>
                set((state) => {
                    if (state.visitedSites.includes(siteId)) {
                        return state;
                    }
                    return {
                        visitedSites: [...state.visitedSites, siteId],
                        sitesVisitedThisSession: [...state.sitesVisitedThisSession, siteId],
                    };
                }),

            selectSite: (site: ArchaeologicalSite | null) =>
                set(() => ({
                    selectedSite: site,
                    isQuizActive: false,
                })),

            setAvatarMessage: (message: string, isTalking: boolean) =>
                set(() => ({
                    avatarMessage: message,
                    isAvatarTalking: isTalking,
                })),

            setQuizActive: (isActive: boolean) =>
                set(() => ({
                    isQuizActive: isActive,
                })),

            recordQuizResult: (siteId: string, score: number, passed: boolean) => {
                set((state) => {
                    const isPerfect = score === 3;

                    return {
                        quizzesPassed: passed && !state.quizzesPassed.includes(siteId)
                            ? [...state.quizzesPassed, siteId]
                            : state.quizzesPassed,
                        perfectScores: isPerfect && !state.perfectScores.includes(siteId)
                            ? [...state.perfectScores, siteId]
                            : state.perfectScores,
                        consecutivePerfect: isPerfect ? state.consecutivePerfect + 1 : 0,
                        consecutivePasses: passed ? state.consecutivePasses + 1 : 0,
                    };
                });
                // Check achievements after recording
                get().checkAchievements();
            },

            unlockAchievement: (achievementId: string) => {
                set((state) => {
                    if (state.unlockedAchievements.includes(achievementId)) {
                        return state;
                    }
                    return {
                        unlockedAchievements: [...state.unlockedAchievements, achievementId],
                    };
                });
            },

            checkAchievements: () => {
                const state = get();
                const newlyUnlocked: string[] = [];

                achievements.forEach((achievement) => {
                    // Skip if already unlocked
                    if (state.unlockedAchievements.includes(achievement.id)) {
                        return;
                    }

                    // Check if condition is met
                    if (achievement.condition(state)) {
                        // Unlock achievement
                        get().unlockAchievement(achievement.id);

                        // Award bonus XP (but don't trigger recursive check)
                        if (achievement.reward > 0) {
                            set((s) => ({ xp: s.xp + achievement.reward }));
                        }

                        newlyUnlocked.push(achievement.id);
                    }
                });

                return newlyUnlocked;
            },

            resetGame: () => set({ ...initialState, sessionStartTime: Date.now() }),
        }),
        {
            name: 'archaeos-game-storage', // localStorage key
            partialize: (state) => ({
                xp: state.xp,
                visitedSites: state.visitedSites,
                unlockedAchievements: state.unlockedAchievements,
                quizzesPassed: state.quizzesPassed,
                perfectScores: state.perfectScores,
                consecutivePerfect: state.consecutivePerfect,
                consecutivePasses: state.consecutivePasses,
            }),
        }
    )
);
