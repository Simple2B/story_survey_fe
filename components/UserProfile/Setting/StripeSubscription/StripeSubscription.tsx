import React, { ReactElement, useEffect, useState } from "react";
import BasicProductDisplay from "./BasicProductDisplay";
import SuccessDisplay from "./SuccessDisplay";

  
const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
);


const StripeSubscription = (): ReactElement => {

    let [message, setMessage] = useState('');
    let [success, setSuccess] = useState(false);
    let [sessionId, setSessionId] = useState('');

    useEffect(() => {
      // Check to see if this is a redirect back from Checkout
      const query = new URLSearchParams(window.location.search);
  
      if (query.get('success')) {
        setSuccess(true);
        setSessionId(query.get('session_id'));
      }
  
      if (query.get('canceled')) {
        setSuccess(false);
        setMessage(
          "Order canceled -- continue to shop around and checkout when you're ready."
        );
      }
    }, [sessionId]);
  
    if (!success && message === '') {
        return <BasicProductDisplay/>;
    } else if (success && sessionId !== '') {
        return <SuccessDisplay sessionId={sessionId} />;
    } else {
        return <Message message={message} />;
    }
};

export default StripeSubscription;
