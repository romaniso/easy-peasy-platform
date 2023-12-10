export interface ExerciseUnit {
    question: 'string';
    options?: {text: string, isCorrect: boolean}[];
    word?: string;
    correctPlace?: number;
    correctForm?: string;
    example?: string;
    isCorrect?: string;
    cardImage?: string;
}