export interface IQuestion {
    question: string, 
    id: number, 
    survey_id: number,
    answers?: [],
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
        questions_deleted?: IQuestion[],
        create_question?: string[],
}

// User list 

export interface IAnswerInfo {
    answer: string,
    created_at: string,
    id: number,
    question_id: number,
    session_id?: number,
}

export interface IQuestionInfo {
    id: string,
    question: string,
    survey_id: number,
    survey: string,
    answers: IAnswerInfo[],
}

export interface ISurveyInfo {
    id: string,
    uuid: string,
    title: string,
    description: string,
    successful_message: string,
    created_at: string,
    user_id: number,
    email: string,
    questions:  IQuestionInfo[],
}
