import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactElement, useRef, useState } from "react";
import { ADMIN } from "../../../redux/types/userTypes";

import styles from "./SurveyList.module.css";

const TableSurveyList = ({userSurveys, setUserSurveys, copyLink, link}): ReactElement => {
    const { data: session} = useSession();

    const [isCopied, setCopied] = useState<boolean>(false);
    
    return  (
        <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Question</th>
                <th scope="col">Link</th>
                </tr>
            </thead>
            <tbody>
                {userSurveys && userSurveys.length > 0 && (
                    userSurveys.map((survey, index) => {
                        
                        return (
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{survey.title}</td>
                                <td>{survey.description}</td>
                                <td>{survey.questions.length}</td>
                                <td className={styles.linkRow} onClick={() => copyLink(survey.id, survey.title)}>
                                    <span className={styles.copyLinkTitle}>copy link</span>
                                    <span className={styles.copyLink}>
                                        {`${link}/survey/${survey.id}`}
                                    </span>
                                </td>
                            </tr>
                        )
                    })
                    
                )} 
                
            </tbody>
        </table>
    );
};

export default TableSurveyList;
