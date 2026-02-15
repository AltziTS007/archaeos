import { GameState } from '@/types';

export interface Achievement {
    id: string;
    name: string;
    nameGreek: string;
    description: string;
    descriptionGreek: string;
    category: 'explorer' | 'knowledge' | 'mastery' | 'regional' | 'speed' | 'xp';
    icon: string;
    reward: number; // Bonus XP
    condition: (state: GameState) => boolean;
    progress?: (state: GameState) => { current: number; total: number };
}

export const achievements: Achievement[] = [
    // EXPLORER ACHIEVEMENTS 🗺️
    {
        id: 'first_steps',
        name: 'First Steps',
        nameGreek: 'Πρώτα Βήματα',
        description: 'Visit your first archaeological site',
        descriptionGreek: 'Επισκέψου το πρώτο αρχαιολογικό μνημείο',
        category: 'explorer',
        icon: '🚶',
        reward: 50,
        condition: (state) => state.visitedSites.length >= 1,
        progress: (state) => ({ current: Math.min(state.visitedSites.length, 1), total: 1 }),
    },
    {
        id: 'curious_explorer',
        name: 'Curious Explorer',
        nameGreek: 'Περίεργος Εξερευνητής',
        description: 'Visit 3 different sites',
        descriptionGreek: 'Επισκέψου 3 διαφορετικά μνημεία',
        category: 'explorer',
        icon: '🧭',
        reward: 100,
        condition: (state) => state.visitedSites.length >= 3,
        progress: (state) => ({ current: Math.min(state.visitedSites.length, 3), total: 3 }),
    },
    {
        id: 'dedicated_explorer',
        name: 'Dedicated Explorer',
        nameGreek: 'Αφοσιωμένος Εξερευνητής',
        description: 'Visit 8 sites',
        descriptionGreek: 'Επισκέψου 8 μνημεία',
        category: 'explorer',
        icon: '🗺️',
        reward: 200,
        condition: (state) => state.visitedSites.length >= 8,
        progress: (state) => ({ current: Math.min(state.visitedSites.length, 8), total: 8 }),
    },
    {
        id: 'master_explorer',
        name: 'Master Explorer',
        nameGreek: 'Μάστορας Εξερευνητής',
        description: 'Visit all 16 sites',
        descriptionGreek: 'Επισκέψου και τα 16 μνημεία',
        category: 'explorer',
        icon: '🌟',
        reward: 500,
        condition: (state) => state.visitedSites.length >= 16,
        progress: (state) => ({ current: state.visitedSites.length, total: 16 }),
    },

    // KNOWLEDGE ACHIEVEMENTS 📚
    {
        id: 'quick_learner',
        name: 'Quick Learner',
        nameGreek: 'Γρήγορος Μαθητής',
        description: 'Pass your first quiz',
        descriptionGreek: 'Πέρασε το πρώτο κουίζ',
        category: 'knowledge',
        icon: '📖',
        reward: 50,
        condition: (state) => (state.quizzesPassed?.length || 0) >= 1,
        progress: (state) => ({ current: Math.min(state.quizzesPassed?.length || 0, 1), total: 1 }),
    },
    {
        id: 'perfect_score',
        name: 'Perfect Score',
        nameGreek: 'Τέλειο Σκορ',
        description: 'Get 3/3 on a quiz',
        descriptionGreek: 'Πάρε 3/3 σε ένα κουίζ',
        category: 'knowledge',
        icon: '⭐',
        reward: 100,
        condition: (state) => (state.perfectScores?.length || 0) >= 1,
        progress: (state) => ({ current: Math.min(state.perfectScores?.length || 0, 1), total: 1 }),
    },
    {
        id: 'scholar',
        name: 'Scholar',
        nameGreek: 'Μελετητής',
        description: 'Pass 5 quizzes',
        descriptionGreek: 'Πέρασε 5 κουίζ',
        category: 'knowledge',
        icon: '🎓',
        reward: 200,
        condition: (state) => (state.quizzesPassed?.length || 0) >= 5,
        progress: (state) => ({ current: Math.min(state.quizzesPassed?.length || 0, 5), total: 5 }),
    },
    {
        id: 'historian',
        name: 'Historian',
        nameGreek: 'Ιστορικός',
        description: 'Pass all 16 quizzes',
        descriptionGreek: 'Πέρασε και τα 16 κουίζ',
        category: 'knowledge',
        icon: '📜',
        reward: 500,
        condition: (state) => (state.quizzesPassed?.length || 0) >= 16,
        progress: (state) => ({ current: state.quizzesPassed?.length || 0, total: 16 }),
    },

    // MASTERY ACHIEVEMENTS 🎯
    {
        id: 'perfectionist',
        name: 'Perfectionist',
        nameGreek: 'Τελειομανής',
        description: 'Get perfect scores on 3 consecutive quizzes',
        descriptionGreek: 'Πάρε τέλεια σκορ σε 3 συνεχόμενα κουίζ',
        category: 'mastery',
        icon: '💎',
        reward: 300,
        condition: (state) => (state.consecutivePerfect || 0) >= 3,
        progress: (state) => ({ current: Math.min(state.consecutivePerfect || 0, 3), total: 3 }),
    },
    {
        id: 'unstoppable',
        name: 'Unstoppable',
        nameGreek: 'Ασταμάτητος',
        description: 'Pass 5 quizzes in a row without failing',
        descriptionGreek: 'Πέρασε 5 κουίζ στη σειρά χωρίς αποτυχία',
        category: 'mastery',
        icon: '🔥',
        reward: 250,
        condition: (state) => (state.consecutivePasses || 0) >= 5,
        progress: (state) => ({ current: Math.min(state.consecutivePasses || 0, 5), total: 5 }),
    },
    {
        id: 'quiz_master',
        name: 'Quiz Master',
        nameGreek: 'Μάστορας Κουίζ',
        description: 'Get perfect scores on 10 quizzes',
        descriptionGreek: 'Πάρε τέλεια σκορ σε 10 κουίζ',
        category: 'mastery',
        icon: '👑',
        reward: 400,
        condition: (state) => (state.perfectScores?.length || 0) >= 10,
        progress: (state) => ({ current: Math.min(state.perfectScores?.length || 0, 10), total: 10 }),
    },

    // REGIONAL ACHIEVEMENTS 🌍
    {
        id: 'athens_explorer',
        name: 'Athens Explorer',
        nameGreek: 'Εξερευνητής Αθηνών',
        description: 'Visit all Attica sites (Parthenon, Acropolis, Sounion)',
        descriptionGreek: 'Επισκέψου όλα τα μνημεία της Αττικής',
        category: 'regional',
        icon: '🏛️',
        reward: 150,
        condition: (state) => {
            const atticaSites = ['parthenon', 'acropolis', 'sounion'];
            return atticaSites.every(site => state.visitedSites.includes(site));
        },
        progress: (state) => {
            const atticaSites = ['parthenon', 'acropolis', 'sounion'];
            const visited = atticaSites.filter(site => state.visitedSites.includes(site)).length;
            return { current: visited, total: 3 };
        },
    },
    {
        id: 'peloponnese_master',
        name: 'Peloponnese Master',
        nameGreek: 'Μάστορας Πελοποννήσου',
        description: 'Visit all Peloponnese sites (Mycenae, Olympia, Epidaurus, Messene, Corinth)',
        descriptionGreek: 'Επισκέψου όλα τα μνημεία της Πελοποννήσου',
        category: 'regional',
        icon: '⚔️',
        reward: 250,
        condition: (state) => {
            const peloponneseSites = ['mycenae', 'olympia', 'epidaurus', 'messene', 'corinth'];
            return peloponneseSites.every(site => state.visitedSites.includes(site));
        },
        progress: (state) => {
            const peloponneseSites = ['mycenae', 'olympia', 'epidaurus', 'messene', 'corinth'];
            const visited = peloponneseSites.filter(site => state.visitedSites.includes(site)).length;
            return { current: visited, total: 5 };
        },
    },
    {
        id: 'island_hopper',
        name: 'Island Hopper',
        nameGreek: 'Νησιώτης Εξερευνητής',
        description: 'Visit all island sites (Knossos, Akrotiri, Delos)',
        descriptionGreek: 'Επισκέψου όλα τα νησιωτικά μνημεία',
        category: 'regional',
        icon: '🏝️',
        reward: 200,
        condition: (state) => {
            const islandSites = ['knossos', 'akrotiri', 'delos'];
            return islandSites.every(site => state.visitedSites.includes(site));
        },
        progress: (state) => {
            const islandSites = ['knossos', 'akrotiri', 'delos'];
            const visited = islandSites.filter(site => state.visitedSites.includes(site)).length;
            return { current: visited, total: 3 };
        },
    },
    {
        id: 'northern_pioneer',
        name: 'Northern Pioneer',
        nameGreek: 'Πρωτοπόρος Βορρά',
        description: 'Visit all Northern Greece sites (Vergina, Philippi, Abdera)',
        descriptionGreek: 'Επισκέψου όλα τα μνημεία της Βόρειας Ελλάδας',
        category: 'regional',
        icon: '⛰️',
        reward: 200,
        condition: (state) => {
            const northernSites = ['vergina', 'philippi', 'abdera'];
            return northernSites.every(site => state.visitedSites.includes(site));
        },
        progress: (state) => {
            const northernSites = ['vergina', 'philippi', 'abdera'];
            const visited = northernSites.filter(site => state.visitedSites.includes(site)).length;
            return { current: visited, total: 3 };
        },
    },

    // SPEED ACHIEVEMENTS ⚡
    {
        id: 'speed_runner',
        name: 'Speed Runner',
        nameGreek: 'Ταχύς Δρομέας',
        description: 'Visit 5 sites in one session',
        descriptionGreek: 'Επισκέψου 5 μνημεία σε μία συνεδρία',
        category: 'speed',
        icon: '⚡',
        reward: 150,
        condition: (state) => (state.sitesVisitedThisSession?.length || 0) >= 5,
        progress: (state) => ({ current: Math.min(state.sitesVisitedThisSession?.length || 0, 5), total: 5 }),
    },
    {
        id: 'marathon_explorer',
        name: 'Marathon Explorer',
        nameGreek: 'Μαραθωνοδρόμος Εξερευνητής',
        description: 'Visit 10 sites in one session',
        descriptionGreek: 'Επισκέψου 10 μνημεία σε μία συνεδρία',
        category: 'speed',
        icon: '🏃',
        reward: 300,
        condition: (state) => (state.sitesVisitedThisSession?.length || 0) >= 10,
        progress: (state) => ({ current: Math.min(state.sitesVisitedThisSession?.length || 0, 10), total: 10 }),
    },

    // XP MILESTONES 💫
    {
        id: 'rising_star',
        name: 'Rising Star',
        nameGreek: 'Ανερχόμενο Αστέρι',
        description: 'Reach 500 XP',
        descriptionGreek: 'Φτάσε τα 500 XP',
        category: 'xp',
        icon: '⭐',
        reward: 0, // No bonus XP for XP milestones
        condition: (state) => state.xp >= 500,
        progress: (state) => ({ current: Math.min(state.xp, 500), total: 500 }),
    },
    {
        id: 'shining_bright',
        name: 'Shining Bright',
        nameGreek: 'Λαμπερό Αστέρι',
        description: 'Reach 1000 XP',
        descriptionGreek: 'Φτάσε τα 1000 XP',
        category: 'xp',
        icon: '💫',
        reward: 0,
        condition: (state) => state.xp >= 1000,
        progress: (state) => ({ current: Math.min(state.xp, 1000), total: 1000 }),
    },
    {
        id: 'legendary',
        name: 'Legendary',
        nameGreek: 'Θρυλικός',
        description: 'Reach 2000 XP',
        descriptionGreek: 'Φτάσε τα 2000 XP',
        category: 'xp',
        icon: '🌠',
        reward: 0,
        condition: (state) => state.xp >= 2000,
        progress: (state) => ({ current: Math.min(state.xp, 2000), total: 2000 }),
    },
];

// Helper function to get achievements by category
export const getAchievementsByCategory = (category: Achievement['category']) => {
    return achievements.filter(a => a.category === category);
};

// Helper function to calculate total possible bonus XP
export const getTotalBonusXP = () => {
    return achievements.reduce((total, achievement) => total + achievement.reward, 0);
};
