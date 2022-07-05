import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from "./StripeSubscription.module.css";
import Logo from './Logo';

const SuccessDisplay = ({ sessionId }) => {
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
    }

    return (
        <section>
            <div className="product Box-root">
                <Logo />
                <div className="description Box-root">
                <h3>Subscription to starter plan successful!</h3>
                </div>
            </div>
            <div>
                <button id="checkout-and-portal-button"  className={styles.checkoutBtn} onClick={handlerClick}>
                    Manage your billing information
                </button>
            </div>
        </section>
    );
};

export default SuccessDisplay;
