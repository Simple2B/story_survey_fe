import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { ReactElement, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { clientApi } from "../../../pages/api/backend/userInstance";
import { IUserResponse } from "../../../redux/types/userTypes";
import deleteIcon from "../../../styles/icons/icons8-cancel-64.png";
import styles from "./UsersList.module.css";
import { surveyApi } from "../../../pages/api/backend/surveyInstance";
import { IGetSurvey, ISurveyInfo } from "../../../redux/types/surveyTypes";
import handler from "../../../pages/api/keys";
import { instancePagination } from "../../../pages/api/backend/pagination";

// The number of items that are shown when the page opens (before scrolling and loading more)
const defaultQuantityItems = 24

const UserList = (): ReactElement => {
  const {data: session} = useSession();
  const {push, asPath} = useRouter();
  const [user, setUser] = useState<IUserResponse>();
  const pathInfo = asPath.split("/");
  const userId = pathInfo[pathInfo.length - 1];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [survey, setSurvey] = useState<ISurveyInfo>({
      id: "",
      uuid: "",
      title: "",
      description: "",
      successful_message: "",
      created_at: "",
      user_id: 0,
      email: "",
      questions: [{
          id: "",
          question: "",
          survey_id: 0,
          survey: "",
          answers: [],
      }],
      published: false,
  });

  const [allServeyListLength, setAllServeyListLength] = useState(0);
  const [userSurveys, setUserSurveys] = useState<IGetSurvey[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(defaultQuantityItems);
  const [endMessage, setEndMessage] = useState(true);

  const getListSurveysByUUID = async () => {
    const response = await instancePagination(pageNumber).get(`/survey/uuid/${userId}`);
    console.log(
      '%c [getListSurveys] RESPONSE data - ', 'color: black; background-color: green; font-weight: 700', response
      );

    setUserSurveys(response.data.data);
    setAllServeyListLength(response.data.data_length);
  };

  const getMoreCards = () => {
    if (userSurveys.length >= allServeyListLength && userSurveys.length > defaultQuantityItems) {
      setEndMessage(false);
    }

    setPageNumber((prev) => prev + 10);
  }

  useEffect(() => {
    if (session && asPath) {
      getListSurveysByUUID();
    };

  }, [session, pageNumber]);

  const handlerClickBack = () => {
      push("/user_profile/survey/users/users_list");
  };

  return  (
    <div className={styles.container}>
      <InfiniteScroll
        dataLength={userSurveys.length}
        next={getMoreCards}
        hasMore={endMessage}
        loader={
          userSurveys.length > defaultQuantityItems
          ? <h3 className="paginationMessage"> Loading...</h3>
          : ''
        }
        endMessage={<h4 className="paginationMessage">Nothing more to show</h4>}
      >
        <div className={styles.backBtn} onClick={handlerClickBack} title="go back">
          <i className={`${styles.arrow} ${styles.left}`}/>
        </div>

        <table className="table table-hover test 1" id="userList">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Create</th>
              <th scope="col">Questions</th>
              <th scope="col">Info</th>
            </tr>
          </thead>
            <tbody>
                {userSurveys && userSurveys.length > 0 && (
                      userSurveys.map((survey, index) => {
                        return (
                              <tr
                                  key={index}

                                  className={styles.tableRow}
                              >
                                  <th scope="row">{index+1}</th>
                                  <td className={`${styles.rowTitle} ${styles.commonRowStyle}`}>
                                      <div className={styles.status}>{survey.published ? "" : "private"}</div>
                                      <div className={styles.titleContent}>
                                          {survey.title}
                                      </div>
                                  </td>
                                  <td className={`${styles.description} ${styles.commonRowStyle}`}>
                                      <div className={styles.descriptionContent}>
                                          {survey.description}
                                      </div>
                                  </td>
                                  <td className={styles.commonRowStyle}>{survey.created_at}</td>
                                  <td className={styles.commonRowStyle}>{survey.questions.length}</td>
                                  <td className={`${styles.btnOpenContainer} ${styles.commonRowStyle}`}>
                                      <span className={styles.btnOpen}
                                          onClick={() => {
                                              setIsOpen(!isOpen);
                                              const surveyId = userSurveys[index].id;
                                              const getInfoSurvey = async() => {
                                                  const infoSurvey = await surveyApi.getInfoSurvey(surveyId);
                                                  setSurvey(infoSurvey);
                                              };
                                              getInfoSurvey();
                                          }}
                                      >
                                          open
                                      </span>
                                  </td>
                              </tr>
                          )
                      })
                    )}
            </tbody>
        </table>
          {isOpen && (
          <div className={styles.modalWindow}>
              <div className={styles.modal}>
                  <i className={styles.editIcon} onClick={() => {setIsOpen(!isOpen)}}>
                      <Image src={deleteIcon} height={30} width={30}/>
                  </i>
                  {survey && (
                      <div className={styles.containerCard}>
                        <div className={styles.titleCard}>
                            <div className={styles.title}>{survey.title}</div>
                        </div>
                        <div className={styles.questionContainer}>
                        <table className="table table-hover" id="userList">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Question</th>
                                    <th scope="col">Answers</th>
                                </tr>
                            </thead>
                            <tbody>
                            {survey.questions
                                && (
                                survey.questions.slice(0, survey.questions.length - 1).map((questionInfo, item) => {
                                    return (
                                        <tr key={item} className={styles.tableRow}>
                                            <th scope="row">{item+1}</th>
                                            <td>
                                                {questionInfo.question.length > 0 && questionInfo.question}
                                            </td>
                                            <td className={styles.commonRowStyle}>
                                                {questionInfo.answers.length}
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                            </tbody>
                        </table>
                        </div>
                      </div>
                  )}
              </div>
          </div>
          )}
          </InfiniteScroll>
    </div>
  );
};

export default UserList;
