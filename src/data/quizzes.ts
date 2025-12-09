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
const ANSWERS: Record<number, string> = {
    1: "반짝반짝\n걸스데이",
    2: "불장난\n블랙핑크",
    3: "I got a boy\n소녀시대",
    4: "물음표\n프라이머리 (feat. 최자, 자이언티)",
    5: "넛티 초코바 바닐라",
    6: "복숭아 생요거트바",
    7: "바닐라 저당콘",
    8: "저당 초코범벅 팝콘",
    9: "영상1팀 정요한",
    10: "기획팀 아이스크림셀 조은지",
    11: "마케팅팀 인지셀 이선민",
    12: "CS팀 임진희",
    13: "두바이 쫀득 쿠키",
    14: "강민경",
    15: "교보문고맛 크림빵",
    16: "동결건조"
};

export const QUIZZES: Quiz[] = Array.from({ length: 16 }, (_, i) => {
    const id = i + 1;
    return {
        id,
        type: 'text',
        question: `Question ${id}`,
        answer: ANSWERS[id],
        audio: `/audio/q_${id}.mp3`,
        answerImage: `/images/${id}.png`,
        answerAudio: id <= 4 ? `/audio/a_${id}.mp3` : undefined,
    };
});
