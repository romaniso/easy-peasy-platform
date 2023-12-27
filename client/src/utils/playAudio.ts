export const playAudio = async (audioSrc: string) => {
    if (audioSrc) {
        const audio = new Audio(audioSrc);
        try {
            await audio.play();
        } catch (err) {
            console.error('Failed to play...' + err);
        }
    }
};