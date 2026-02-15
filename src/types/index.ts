export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface ArchaeologicalSite {
    id: string;
    name: string;
    description: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    imageUrl: string;
    quiz: QuizQuestion[];
    historicalFacts: string[];
}

export interface GameState {
    xp: number; // Changed from currentXP for consistency
    visitedSites: string[];
    selectedSite: ArchaeologicalSite | null;
    isAvatarTalking: boolean;
    avatarMessage: string;
    isQuizActive: boolean;

    // Achievement tracking
    unlockedAchievements: string[];
    quizzesPassed: string[];
    perfectScores: string[];
    consecutivePerfect: number;
    consecutivePasses: number;
    sitesVisitedThisSession: string[];
    sessionStartTime: number;
}
