export interface Quiz {
    id: number;
    type: 'text' | 'image';
    question: string;
    answer: string;
    image?: string; // Optional image URL for image type quizzes
}

export const CATEGORIES = [
    "카테고리 1",
    "카테고리 2",
    "카테고리 3",
    "카테고리 4"
];

// 4 categories x 4 difficulty levels = 16 quizzes
// IDs 1-4: Category 1 (10, 20, 30, 40 points)
// IDs 5-8: Category 2
// IDs 9-12: Category 3
// IDs 13-16: Category 4
export const QUIZZES: Quiz[] = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    type: 'text',
    question: `Question for Cell ${i + 1}\n(Edit me in src/data/quizzes.ts)`,
    answer: `Answer for Cell ${i + 1}`,
}));
