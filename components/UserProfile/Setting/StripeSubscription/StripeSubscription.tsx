import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import useSWR from "swr";
import { clientApi } from "../../../../pages/api/backend/userInstance";
import BasicProductDisplay from "./BasicProductDisplay";
import SuccessDisplay from "./SuccessDisplay";

  
const Message = ({ message }) => {
    return <section>
        <p>{message}</p>
    </section>
    }
;


const StripeSubscription = (): ReactElement => {
    const {asPath} = useRouter();
    const {data: session} = useSession();
    const [userData, setUserData] = useState(null);
    let [message, setMessage] = useState('');
    let [success, setSuccess] = useState(false);
    let [sessionId, setSessionId] = useState("");

    const [type, setType] = useState("");
    const [isCancel, setIsCancel] = useState<boolean>(false);
    const [cancelAt, setCancelAt] = useState(null);
    const getCurrentUser = async() => {
      if (session) {
          const user = await clientApi.getUser(session.user.email);
          console.log("=>>>>>StripeSubscription: user ", user);
          setUserData(user);
          setIsCancel(user.subscription_info.cancel_at_period_end);
          setCancelAt(user.subscription_info.cancel_at)
      };
    };
    useEffect(() => {
        getCurrentUser();
    }, [session]);

    const { data, error } = useSWR(
      sessionId ? `/api/checkout/${sessionId}`
          : null,
          (url) => fetch(url).then(res => res.json())
      );

    useEffect(() => {
        setSuccess(true);
        
        if (session && userData) {
            console.log("StripeSubscription: userData ", userData);
            console.log("==>> userData ", userData);
            
            setSuccess(true);
            if (userData.subscription_info) {
                setSessionId(userData.subscription_info.session_id);
                setType(userData.subscription_info.type);
            }
        }
        // Check to see if this is a redirect back from Checkout
        if (session && data) {
            console.log("==>>> data ", data);
            
            setSuccess(true);
            setSessionId(data.session.id);
        };
    
        if (asPath.includes('canceled')) {
            setSuccess(false);
            setMessage(
              "Order canceled -- continue to site around and subscribe when you're ready."
            );
        }
      }, [session, data, userData]); 

      if (message !== '') {
          setTimeout(() => {
            setSuccess(false);
            setMessage("")
          }, 1000);
      };

      console.log(" sessionId && message === '' && !sessionId ", session && !success && message === '' && (sessionId !== '' || !sessionId));
      console.log(" =>>> userData ", userData);
      
      if (!success && message === '' ||  !sessionId) {
          console.log("success", success);
          console.log("message", message);
          return <BasicProductDisplay/>;
      } else if (session && success  && sessionId !== "" ) {
          console.log("sessionId", sessionId);
          return <SuccessDisplay sessionId={sessionId} type={type} cancel_at_period_end={isCancel} cancel_at={cancelAt}/>;
      } else {
          return <Message message={message} />;
      }
};

export default StripeSubscription;
