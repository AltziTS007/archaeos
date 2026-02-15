'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapPin, Sparkles, Star } from 'lucide-react';
import { archaeologicalSites } from '@/data/sites';
import { useGameStore } from '@/store/useGameStore';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { soundManager } from '@/utils/soundManager';

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom colorful marker icons for youngsters!
const createCustomIcon = (isVisited: boolean) => {
    const iconHtml = isVisited
        ? `<div style="background: linear-gradient(135deg, #ffd700 0%, #ff6f00 100%); color: white; padding: 14px; border-radius: 50%; box-shadow: 0 6px 20px rgba(255, 215, 0, 0.6); display: flex; align-items: center; justify-content: center; border: 3px solid white; animation: pulse 2s infinite;">
         <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
         </svg>
       </div>`
        : `<div style="background: linear-gradient(135deg, #0066ff 0%, #9c27b0 100%); color: white; padding: 14px; border-radius: 50%; box-shadow: 0 6px 20px rgba(0, 102, 255, 0.5); display: flex; align-items: center; justify-content: center; border: 3px solid white;">
         <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
           <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
           <circle cx="12" cy="10" r="3"/>
         </svg>
       </div>`;

    return L.divIcon({
        html: iconHtml,
        className: 'custom-marker',
        iconSize: [56, 56],
        iconAnchor: [28, 56],
        popupAnchor: [0, -56],
    });
};

// Component to handle map flying to location
function FlyToLocation({ coords, zoom }: { coords: [number, number] | null; zoom: number }) {
    const map = useMap();

    useEffect(() => {
        if (coords) {
            map.setView(coords, zoom, {
                animate: true,
                duration: 1,
                easeLinearity: 0.25,
            });
        }
    }, [coords, zoom, map]);

    return null;
}

export default function MapComponent() {
    const { selectSite, visitedSites, setAvatarMessage } = useGameStore();
    const [flyToCoords, setFlyToCoords] = useState<[number, number] | null>(null);

    const handleMarkerClick = useCallback(
        (site: typeof archaeologicalSites[0]) => {
            // Fly to the site
            setFlyToCoords([site.coordinates.latitude, site.coordinates.longitude]);

            // Update game state
            selectSite(site);

            // Update avatar message with emojis!
            const messages = [
                `🏛️ Α, ${site.name}! Ένα υπέροχο μέρος με πλούσια ιστορία!`,
                `🚀 Πάμε να εξερευνήσουμε ${site.name} μαζί!`,
                `✨ ${site.name}... Έχω τόσα πολλά να σου πω γι' αυτό!`,
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            setAvatarMessage(randomMessage, true);
        },
        [selectSite, setAvatarMessage]
    );

    const isVisited = useCallback(
        (siteId: string) => visitedSites.includes(siteId),
        [visitedSites]
    );

    return (
        <div className="w-full h-screen relative">
            <MapContainer
                key="archaeos-map"
                center={[38.5, 23.5]}
                zoom={7}
                minZoom={6}
                maxZoom={10}
                maxBounds={[
                    [34.5, 19.0], // Southwest corner (south of Crete, west of Greece)
                    [42.0, 29.0]  // Northeast corner (north of Greece, east of islands)
                ]}
                maxBoundsViscosity={1.0}
                style={{ width: '100%', height: '100%' }}
                className="z-0"
            >
                {/* OpenStreetMap tiles - completely free! */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Fly to location controller */}
                <FlyToLocation coords={flyToCoords} zoom={12} />

                {/* Render markers for each archaeological site */}
                {archaeologicalSites.map((site) => (
                    <Marker
                        key={site.id}
                        position={[site.coordinates.latitude, site.coordinates.longitude]}
                        icon={createCustomIcon(isVisited(site.id))}
                        eventHandlers={{
                            click: () => handleMarkerClick(site),
                        }}
                    >
                        <Popup>
                            <div className="text-center p-2">
                                <strong className="font-cinzel text-blue-600 text-lg block mb-2">{site.name}</strong>
                                {isVisited(site.id) ? (
                                    <div className="text-yellow-600 font-bold flex items-center justify-center gap-1">
                                        <Sparkles className="w-4 h-4" />
                                        Κατακτημένο!
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                ) : (
                                    <div className="text-purple-600 font-bold flex items-center justify-center gap-1">
                                        <Star className="w-4 h-4" />
                                        Κάνε κλικ για εξερεύνηση!
                                    </div>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Map overlay with colorful title */}
            <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-blue-900/80 via-purple-900/60 to-transparent pointer-events-none z-10">
                <h1 className="text-5xl md:text-7xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 text-center drop-shadow-2xl tracking-wider">
                    ARCHAEOS
                </h1>
                <p className="text-center text-white mt-2 text-lg md:text-xl font-bold drop-shadow-lg">
                    🏛️ Ανακάλυψε την Αρχαία Ελλάδα! ✨
                </p>
            </div>
        </div>
    );
}
