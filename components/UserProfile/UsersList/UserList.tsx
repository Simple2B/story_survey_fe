import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { clientApi } from "../../../pages/api/backend/userInstance";
import { IUserResponse } from "../../../redux/types/userTypes";

import styles from "./UsersList.module.css";

const UserList = (): ReactElement => {
    const {data: session} = useSession();
    const {asPath} = useRouter();
    const [user, setUser] = useState<IUserResponse>();

    const pathInfo = asPath.split("/");
    const userId = Number(pathInfo[pathInfo.length - 1]);

    useEffect(() => {
          if (session && asPath) {
            const getUser = async() => {
              const usersFromDB = await clientApi.getUserByID(userId);
              console.log("usersFromDB ", usersFromDB);
              setUser(usersFromDB);
            };
            getUser();
            
          };
  
        }, [session, user]);

    console.log("UserList: user ==>>>", user);
    
    
    return  (
      <div className={styles.container}>
          <table className="table table-hover">
              <thead>
                  <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Create</th>
                  </tr>
              </thead>
              <tbody>
                  {user && user.surveys.length > 0 && (
                      user.surveys.map((survey, index) => {
                          return (
                              <tr key={index} onClick={() => {}} className={styles.tableRow}>
                                  <th scope="row">{index+1}</th>
                                  <td>{survey.title}</td>
                                  <td>{survey.description}</td>
                                  <td>{survey.created_at}</td>
                              </tr>
                          )
                      })
                  )} 
              </tbody>
          </table>
      </div>
    );
};

export default UserList;
