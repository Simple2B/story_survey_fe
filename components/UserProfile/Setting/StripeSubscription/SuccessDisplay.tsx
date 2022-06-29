import { useRouter } from 'next/router';
import React from 'react';
import { stripeApi } from '../../../../pages/api/backend/stripeInstance';
import styles from "./StripeSubscription.module.css";
import Logo from './Logo';

const SuccessDisplay = ({ sessionId }) => {
    const {push} = useRouter();

    const sendSessionId = () => {
        const data = {
            session_id: sessionId
        };
        const createPortalSession = async () => {
            const portalUrl = await stripeApi.createPortalSession(data);
            console.log("portalUrl ", portalUrl);
            push(portalUrl);
        };
        createPortalSession();
    };

    return (
        <section>
            <div className="product Box-root">
                <Logo />
                <div className="description Box-root">
                <h3>Subscription to starter plan successful!</h3>
                </div>
            </div>
            <div>
                <button id="checkout-and-portal-button" onClick={sendSessionId} className={styles.checkoutBtn}>
                    Manage your billing information
                </button>
            </div>
        </section>
    );
};

export default SuccessDisplay;
