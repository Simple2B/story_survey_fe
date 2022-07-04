export interface IQuestion {
    question: string, id: number, survey_id: number
}
export interface ICreateSurvey {
    // question: string;
    id?: number,
    title: string,
    description?: string,
    successful_message?: string,
    created_at?: string;
    user_id?: number,
    email: string,
    questions: string[],
}

export interface IGetSurvey {
        // question: string;
        id?: number,
        uuid?: string,
        title: string,
        description?: string,
        successful_message?: string,
        created_at?: string;
        user_id?: number,
        email?: string,
        questions: IQuestion[],
    }