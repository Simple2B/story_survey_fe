import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { clientApi } from "../../../pages/api/backend/userInstance";
import { ADMIN, IUserResponse } from "../../../redux/types/userTypes";
import styles from "./UsersList.module.css";

const UsersList = (): ReactElement => {
    const { data: session} = useSession();
    const { push } = useRouter();
    const [ users, setUsers ] = useState<IUserResponse[]>();
    
    useEffect(() => {
          if (session) {
            const getUsers = async() => {
              const usersFromDB = await clientApi.getUsers();
              setUsers(usersFromDB);
            };
            getUsers();
          };
    }, [session]);

    const openUserList = (id: number) => {
        push(`/user_profile/survey/users/user/${id}`);
    };
    
    return  (
        <div className={styles.container}>
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">Username</th>
                    <th scope="col">Survey</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 && (
                        users.map((user, index) => {
                            return (
                                <tr key={index} onClick={() => openUserList(user.id)} className={styles.tableRow}>
                                    <th scope="row">{index+1}</th>
                                    <td className={styles.emailContainer}>
                                        {user.email}
                                        <span className={styles.role}>
                                            {user.role === ADMIN ? "admin" : ""}
                                        </span>
                                    </td>
                                    <td>{user.username}</td>
                                    {user.surveys.length > 0 
                                        ? <td>{user.surveys.length}</td>
                                        : <td>0</td>
                                    }
                                </tr>
                            )
                        })
                    )} 
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;
