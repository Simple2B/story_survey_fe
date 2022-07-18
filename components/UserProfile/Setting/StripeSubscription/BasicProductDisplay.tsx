import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { stripeApi } from "../../../../pages/api/backend/stripeInstance";
import { clientApi } from "../../../../pages/api/backend/userInstance";
import { IUserResponse, IUserSubscriptionInfo } from "../../../../redux/types/userTypes";
import styles from "./StripeSubscription.module.css";


const BasicProductDisplay = (): ReactElement => {
    const {data: session } = useSession();
    const {asPath} = useRouter();
    const [publicKeyStripe, setPublicKeyStripe] = useState("");
    const [priceBasicProduct, setPriceBasicProduct] = useState("");
    const [priceAdvancedProduct, setPriceAdvancedProduct] = useState(""); 
    const [email, setEmail] = useState("");
    const [subscription, setSubscription] = useState<IUserSubscriptionInfo>(null);

    useEffect(() => {
        fetch('/api/keys', {
            method: 'GET',
            headers: {'Content-type': 'application/json'},
        })
            .then((res) => res.json())
            .then((data) => {
                setPublicKeyStripe(data.publishableKey);
                setPriceBasicProduct(data.priceBasicProduct);
                setPriceAdvancedProduct(data.priceAdvancedProduct);
            });
        if (session) {
            const getUser = async() => {
                const userFromDB = await clientApi.getUser(session.user.email);
                setSubscription(userFromDB.subscription_info)
            };
            getUser();
            setEmail(session.user.email);
        };
    }, [session, asPath.includes("/user_profile/survey/setting")]);
  
    if (!publicKeyStripe && !priceBasicProduct && !priceAdvancedProduct) {
        return <div>Loading...</div>
    };

    const stripePromise = loadStripe(publicKeyStripe);

    const handlerClick = async (priceKey: string) => {     
        const stripe = await stripePromise;
        if (subscription) {
            const customer_id: string = subscription.customer_id
            const {stripeSession, sessionId} = await fetch('/api/checkout/session', {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    quantity: 1, 
                    email: email, 
                    product_price: priceKey, 
                    customer_id: customer_id
                })
            }).then(res => res.json());
            const dataSessionToDB = {
                session: stripeSession,
                email: email,
                product_key: priceKey,
                stripe_customer: customer_id,
                stripe_session_id: sessionId,
            };
            const saveSessionToDB = async() => await stripeApi.createSessionStripe(dataSessionToDB)
            saveSessionToDB();
            const { error } = await stripe.redirectToCheckout({sessionId});
            console.log(" error ", error);
        };
    };

    return (
        <div className={styles.productsContainer}>
            <div className={styles.titleSub}>Subscription</div>
            <section className={styles.subProductContainer}>
                <div className={styles.product}>
                    <div className={styles.description}>
                        <h3>Basic</h3>
                        <h6>$1.00 / month</h6>
                    </div>
                </div>
                <div>
                    <button 
                        id="checkout-and-portal-button" 
                        className={styles.checkoutBtn} 
                        onClick={() => handlerClick(priceBasicProduct)}
                    >
                        subscribe
                    </button>
                </div>
            </section>

            <section className={styles.subProductContainer}>
                <div className={styles.product}>
                    <div className={styles.description}>
                        <h3>Advanced</h3>
                        <h6>$5.00 / month</h6>
                    </div>
                </div>
                <div>
                    <button 
                        id="checkout-and-portal-button" 
                        className={styles.checkoutBtn} 
                        onClick={() => handlerClick(priceAdvancedProduct)}
                    >
                        subscribe
                    </button>
                </div>
            </section>
        </div>
    )
};

export default BasicProductDisplay;
