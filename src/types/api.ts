export type Question = {
    id?: number;
    imageId?: string;
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

export type Login = {
    username: string,
    password: string
}

export type LoginResponse = {
    accessToken: string,
    refreshToken: string
}

export type User = {
    id: number,
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    grade: number,
    schoolId: number,
    totalScore: number,
    dateOfBirth: Date,
    gender: number,
    role: number
    isActive: boolean
}

export type School = {
    id: number,
    name: string,
    region: string,
    city: string,
    country: string
}

export type Student = {
    id: number,
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    phone: string,
    grade: number,
    schoolId: number,
    email?: string,
    dateOfBirth: string,
    gender: number
}

export type EnrollmentResponse = {
    unitNumber: number,
    isCompleted: boolean,
    paid: boolean,
    enrolled: boolean,
    date: Date
}

export type WeeklyAccessResponse = {
    week1: boolean,
    week2: boolean,
    week3: boolean,
    week4: boolean
}

