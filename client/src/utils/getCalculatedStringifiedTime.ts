export const getCalculatedStringifiedTime = (secs: number): string => {
    const minutes: number = Math.floor(secs / 60);
    const returnedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds: number = Math.floor(secs % 60);
    const returnedSeconds: string = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
};