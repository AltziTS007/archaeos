'use client';

import dynamic from 'next/dynamic';
import AvatarOverlay from '@/components/AvatarOverlay';
import SiteDrawer from '@/components/SiteDrawer';
import AchievementManager from '@/components/AchievementManager';

// Import MapComponent with SSR disabled
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
    ssr: false,
});

export default function PlayPage() {
    return (
        <main className="relative w-full h-screen overflow-hidden">
            {/* Background map */}
            <MapComponent />

            {/* Avatar guide overlay */}
            <AvatarOverlay />

            {/* Site information drawer */}
            <SiteDrawer />

            {/* Achievement notifications */}
            <AchievementManager />
        </main>
    );
}
