import {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import { surveyApi } from '../../pages/api/backend/surveyInstance';

export const useCheckAnswer = (surveyUUID: string): boolean => {
    const [isAnswer, setAnswer] = useState(false);
    const nextSession = Cookies.get('session_id');
    useEffect(() => {
        (async() => {
            const data = {
                uuid: surveyUUID, session: nextSession
            }
            const isAnswerTheQuestions = await surveyApi.getAnswerSessionOfSurvey(data);
            setAnswer(isAnswerTheQuestions)
        })()
    }, [surveyUUID]);

    return isAnswer;
}
