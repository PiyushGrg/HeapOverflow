export interface IQuestion {
    _id: string;
    title: string;
    description: string;
    totalAnswers: number;
    createdAt: string;
    updatedAt: string;
    code: string;
    tags: string[];
    user: IUser;
    savedBy: string[];
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    profilePicUrl: string;
    clerkUserId: string;
}

export interface IAnswer {
    _id: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    code: string;
    user: IUser;
    question: IQuestion;
}