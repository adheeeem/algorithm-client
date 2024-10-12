export type Question = {
    questionTj: string;
    questionEn: string;
    questionRu: string;
    optionsTj: string[];
    optionsEn: string[];
    optionsRu: string[];
    weekNumber: number;
    unitNumber: number;
    grade: number;
    answerId: number;
    [key: string]: any;
};