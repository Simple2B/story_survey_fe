import React from 'react';
import { useRouter } from 'next/router';
import styles from "./StripeSubscription.module.css";


const SuccessDisplay = ({ sessionId, type, cancel_at_period_end, cancel_at}) => {
    console.log("SuccessDisplay: sessionId ", sessionId);
    const { push } = useRouter();
    
    const handlerClick = async() => {
        console.log("stripeIdSession ", sessionId);
        const {url} = await fetch('/api/checkout/create_portal_session', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ session_id: sessionId })
        }).then(res => res.json());
        console.log("url ", url);

        if (url !== undefined)  {
            push(url)
        } else {
            console.error(" error ", url)
        }
    };

    return (
        <section className={styles.successDisplayContainer}>
            <div className="product Box-root">
                <div className="description Box-root">
                    <h3>{type} subscription</h3>
                    {cancel_at_period_end && 
                    <div className={styles.cancel}>
                        Cancelled at {cancel_at}
                    </div>
                    }
                </div>
            </div>
            <div>
                <button id="checkout-and-portal-button"  
                        className={styles.checkoutBtn} 
                        onClick={handlerClick}
                >
                    Manage your billing information
                </button>
            </div>
        </section>
    );
};

export default SuccessDisplay;
