import type { Metadata } from 'next';
import { Cinzel, Inter } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
    subsets: ['latin'],
    variable: '--font-cinzel',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'ARCHAEOS | Εξερεύνηση Αρχαίας Ελλάδας',
    description: 'Εξερεύνησε την Αρχαία Ελλάδα μέσα από έναν διαδραστικό χάρτη και μάθε για τα σημαντικότερα αρχαιολογικά μνημεία.',
    keywords: 'Αρχαία Ελλάδα, εκπαίδευση, αρχαιολογία, ιστορία, παιδιά',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="el">
            <body className={`${cinzel.variable} ${inter.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
