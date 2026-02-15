// Sound effects utility for ARCHAEOS
// Provides simple sound feedback for user interactions

class SoundManager {
    private sounds: Map<string, HTMLAudioElement> = new Map();
    private enabled: boolean = true;
    private volume: number = 0.3;

    constructor() {
        // Initialize sounds (using data URIs for simple beeps)
        // In production, replace with actual sound files
        this.initializeSounds();
    }

    private initializeSounds() {
        // Simple beep sounds using Web Audio API
        // These are placeholders - replace with actual sound files in /public/sounds/

        // For now, we'll use the Web Audio API to generate simple tones
        // In production, load actual MP3/OGG files
    }

    private createBeep(frequency: number, duration: number, type: OscillatorType = 'sine'): void {
        if (!this.enabled) return;

        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type;

            gainNode.gain.setValueAtTime(this.volume, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (error) {
            console.warn('Sound playback failed:', error);
        }
    }

    // Public methods for different sound effects
    playClick() {
        this.createBeep(800, 0.05, 'sine');
    }

    playSuccess() {
        // Happy ascending notes
        this.createBeep(523, 0.1, 'sine'); // C
        setTimeout(() => this.createBeep(659, 0.1, 'sine'), 100); // E
        setTimeout(() => this.createBeep(784, 0.15, 'sine'), 200); // G
    }

    playError() {
        // Descending notes
        this.createBeep(400, 0.1, 'square');
        setTimeout(() => this.createBeep(300, 0.15, 'square'), 100);
    }

    playLevelUp() {
        // Triumphant ascending arpeggio
        this.createBeep(523, 0.08, 'sine'); // C
        setTimeout(() => this.createBeep(659, 0.08, 'sine'), 80); // E
        setTimeout(() => this.createBeep(784, 0.08, 'sine'), 160); // G
        setTimeout(() => this.createBeep(1047, 0.2, 'sine'), 240); // C (octave)
    }

    playConquest() {
        // Victory fanfare
        this.createBeep(659, 0.1, 'triangle');
        setTimeout(() => this.createBeep(784, 0.1, 'triangle'), 100);
        setTimeout(() => this.createBeep(880, 0.1, 'triangle'), 200);
        setTimeout(() => this.createBeep(1047, 0.25, 'triangle'), 300);
    }

    // Settings
    setVolume(volume: number) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    setEnabled(enabled: boolean) {
        this.enabled = enabled;
    }

    isEnabled(): boolean {
        return this.enabled;
    }
}

// Export singleton instance
export const soundManager = new SoundManager();
