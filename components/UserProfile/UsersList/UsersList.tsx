import { useSession } from "next-auth/react";
import React, { ReactElement, useEffect, useState } from "react";
import { clientApi } from "../../../pages/api/backend/userInstance";

import styles from "./UsersList.module.css";

const UsersList = (): ReactElement => {
    const {data: session} = useSession();
    console.log("Setting: session => ", session);

    useEffect(() => {
          if (session) {

            const getUsers = async() => {
              const usersFromDB = await clientApi.getUsers();
              console.log("usersFromDB ", usersFromDB);
            };
            getUsers();
          };
  
        }, [session])
    
    return  (
        <div className={styles.container}>
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;
