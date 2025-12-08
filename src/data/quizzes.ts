export interface Quiz {
    id: number;
    type: 'text' | 'image';
    question: string;
    answer: string;
    image?: string; // Optional image URL for image type quizzes
    audio?: string; // Path to question audio
    answerImage?: string; // Path to answer image
    answerAudio?: string; // Path to answer audio
}

export const CATEGORIES = [
    "노래",
    "뒷면의 비밀",
    "라라 유니버스",
    "F&B 트렌드"
];

// 4 categories x 4 difficulty levels = 16 quizzes
// IDs 1-4: Category 1 (10, 20, 30, 40 points)
// IDs 5-8: Category 2
// IDs 9-12: Category 3
// IDs 13-16: Category 4
export const QUIZZES: Quiz[] = Array.from({ length: 16 }, (_, i) => {
    const id = i + 1;
    return {
        id,
        type: 'text',
        question: `Question for Cell ${id}\n(Edit me in src/data/quizzes.ts)`,
        answer: `Answer for Cell ${id}`,
        audio: `/audio/q_${id}.mp3`,
        answerImage: id === 1 ? '/images/1.png' : `/images/a_${id}.png`,
        answerAudio: `/audio/a_${id}.mp3`,
    };
});
