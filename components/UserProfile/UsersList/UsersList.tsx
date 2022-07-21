import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { instancePagination } from "../../../pages/api/backend/pagination";
import { clientApi } from "../../../pages/api/backend/userInstance";
import { ADMIN, IUserResponse } from "../../../redux/types/userTypes";
import styles from "./UsersList.module.css";

const UsersList = (): ReactElement => {
  const { data: session} = useSession();
  const { push } = useRouter();

  const [allServeyListLength, setAllServeyListLength] = useState(0);
  const [userSurveys, setUserSurveys] = useState<IUserResponse[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(24);
  const [endMessage, setEndMessage] = useState(true);

  const getListSurveysByUUID = async () => {
    const response = await instancePagination(pageNumber).get('/user/get_users');
    console.log(
      '%c [getListSurveys] RESPONSE data - ', 'color: black; background-color: green; font-weight: 700', response
      );

    setUserSurveys(response.data.data);
    setAllServeyListLength(response.data.data_length);
  };

  const getMoreCards = () => {
    if (userSurveys.length >= allServeyListLength) {
      setEndMessage(false);
    }

    setPageNumber((prev) => prev + 10);
  }

  useEffect(() => {
    if (session) {
      getListSurveysByUUID()
    };

  }, [session, pageNumber]);

  const openUserList = (user_uuid: string) => {
    push(`/user_profile/survey/users/user/${user_uuid}`);
  };

  return  (
      <div className={styles.container}>
        <InfiniteScroll
          dataLength={userSurveys.length}
          next={getMoreCards}
          hasMore={endMessage}
          loader={""}
        >
          <table className="table table-hover">
              <thead>
                  <tr>
                  <th scope="col">#</th>
                  <th scope="col">Email</th>
                  <th scope="col">Username</th>
                  <th scope="col">Subscription</th>
                  <th scope="col">Survey</th>
                  <th scope="col">Info</th>
                  </tr>
              </thead>
              <tbody>
                  {userSurveys && userSurveys.length > 0 && (
                      userSurveys.map((user, index) => {
                          return (
                              <tr key={index} className={styles.tableRow}>
                                  <th scope="row">{index+1}</th>
                                  <td className={styles.emailContainer}>
                                      {user.email}
                                      <span className={styles.role}>
                                          {user.role === ADMIN ? "admin" : ""}
                                      </span>
                                  </td>
                                  <td>{user.username}</td>
                                  <td className={styles.subscriptionRow}>
                                      {
                                          user.subscription_info &&
                                              user.subscription_info.cancel_at_period_end ?
                                                  <div className={styles.cancelContainer}>
                                                      {/* {user.subscription_info.type} */}
                                                      <div className={styles.cancel}>
                                                          Cancels: {user.subscription_info.cancel_at.split(",")[0]}
                                                      </div>
                                                  </div> : ""
                                      }
                                      { user.subscription_info && user.subscription_info.subscription_id ?
                                                  user.subscription_info.type
                                              :
                                              ""
                                      }
                                  </td>
                                  {user.surveys.length > 0
                                      ? <td>{user.surveys.length}</td>
                                      : <td>0</td>
                                  }
                                  <td className={styles.btnOpenContainer}>
                                      <span className={styles.btnOpen}
                                              onClick={() => openUserList(user.uuid)}>
                                          open
                                      </span>
                                  </td>
                              </tr>
                          )
                      })
                  )}
              </tbody>
          </table>
        </InfiniteScroll>
      </div>
  );
};

export default UsersList;
