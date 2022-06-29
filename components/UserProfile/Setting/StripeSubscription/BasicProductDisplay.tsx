import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { stripeApi } from "../../../../pages/api/backend/stripeInstance";
import Logo from "./Logo";
import styles from "./StripeSubscription.module.css";

const BasicProductDisplay = () => {
    const {data: session} = useSession();
    const {push} = useRouter();
    const [key, setKey] = useState(null);

    useEffect(() => {
        if (session) {
            const getApiKey = async() => {
                const keyStripe = await stripeApi.getKeyStripe();
                
                setKey(keyStripe)
            }
            getApiKey();
        }
    }, [session]);

    const handlerClick = () => {
        const createSession = async() => {
            if (key && session){
                const redirectUrl = await stripeApi.createSessionStripe({email: session.user.email, key: key.BASIC_PRICE_LOOKUP_KEY});
                console.log("sessionStripe ", redirectUrl);
                push(redirectUrl);
            };
        };
       createSession();
    };

   return (
        <section className={styles.subProductContainer}>
            <div className={styles.product}>
                <Logo />
                <div className={styles.description}>
                    <h3>Starter plan</h3>
                    <h5>$1.00 / month</h5>
                </div>
            </div>
            <div>
                <button id="checkout-and-portal-button" className={styles.checkoutBtn} onClick={handlerClick}>
                    Checkout Basic Subscription
                </button>
            </div>
        </section>
)};

export default BasicProductDisplay;
