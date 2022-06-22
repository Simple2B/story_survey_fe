export interface ICreateSurvey {
    id?: number,
    title: string,
    created_at?: string;
    user_id: number,
    email: string,
    questions: string[],
}