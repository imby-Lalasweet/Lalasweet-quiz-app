export interface Quiz {
    id: number;
    type: 'text' | 'image';
    question: string;
    answer: string;
    image?: string; // Optional image URL for image type quizzes
}

export const QUIZZES: Quiz[] = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    type: 'text',
    question: `Question for Cell ${i + 1}\n(Edit me in src/data/quizzes.ts)`,
    answer: `Answer for Cell ${i + 1}`,
}));
