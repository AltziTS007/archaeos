'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Map, Trophy, BookOpen, Star } from 'lucide-react';

export default function LandingPage() {
    const router = useRouter();

    const handleStart = () => {
        router.push('/play');
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
            {/* Simplified background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 text-9xl">🏛️</div>
                <div className="absolute bottom-20 right-20 text-9xl">🏺</div>
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
                {/* Logo/Title */}
                <div className="mb-12">
                    <div className="text-8xl mb-6">🏛️</div>
                    <h1 className="text-6xl md:text-8xl font-cinzel font-bold text-white mb-4 drop-shadow-2xl">
                        ARCHAEOS
                    </h1>
                    <p className="text-2xl md:text-3xl text-white font-bold drop-shadow-lg">
                        Εξερεύνηση Αρχαίας Ελλάδας
                    </p>
                </div>

                {/* Description */}
                <p className="text-xl md:text-2xl text-white max-w-3xl mb-16 leading-relaxed drop-shadow-lg">
                    Ταξίδεψε στην Αρχαία Ελλάδα! Ανακάλυψε 16 αρχαιολογικά μνημεία,
                    λύσε κουίζ, κέρδισε XP και ξεκλείδωσε επιτεύγματα! 🎉
                </p>

                {/* Features Grid - Simplified with better contrast */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl">
                    <FeatureCard
                        icon={<Map className="w-12 h-12" />}
                        title="16 Μνημεία"
                        description="Από τον Παρθενώνα μέχρι τα Μετέωρα"
                        color="bg-blue-500"
                    />
                    <FeatureCard
                        icon={<BookOpen className="w-12 h-12" />}
                        title="48 Κουίζ"
                        description="Μάθε την ιστορία παίζοντας"
                        color="bg-purple-500"
                    />
                    <FeatureCard
                        icon={<Trophy className="w-12 h-12" />}
                        title="20 Επιτεύγματα"
                        description="Ξεκλείδωσε όλα τα βραβεία"
                        color="bg-orange-500"
                    />
                </div>

                {/* Start Button - Simplified */}
                <button
                    onClick={handleStart}
                    className="px-16 py-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-3xl font-cinzel font-bold rounded-full shadow-2xl hover:scale-110 hover:shadow-yellow-500/50 transition-all duration-300"
                >
                    <span className="flex items-center gap-4">
                        <Sparkles className="w-8 h-8" />
                        Ξεκίνα την Περιπέτεια!
                        <Star className="w-8 h-8" />
                    </span>
                </button>

                {/* Stats - Simplified */}
                <div className="mt-12 flex gap-12 text-white text-lg font-bold">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">⚡</span>
                        <span>100% Δωρεάν</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🎯</span>
                        <span>Ηλικίες 9-15</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
    return (
        <div className="bg-white rounded-3xl p-8 shadow-2xl hover:scale-105 transition-transform">
            <div className={`inline-flex p-5 rounded-full ${color} text-white mb-6 shadow-lg`}>
                {icon}
            </div>
            <h3 className="text-2xl font-cinzel font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-lg text-gray-700 font-medium">{description}</p>
        </div>
    );
}
