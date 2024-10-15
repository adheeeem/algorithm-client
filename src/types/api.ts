export type Question = {
    id: number;
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

export type ErrorResponse = {
    statusCode: number,
    message: string,
    details: string
}

export type Response<T = any> = {
    statusCode: number,
    message: string,
    data: T | null
}

export type ListResponse<T = any> = {
    total: number,
    items: T[]
}