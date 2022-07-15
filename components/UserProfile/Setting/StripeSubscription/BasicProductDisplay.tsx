import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { stripeApi } from "../../../../pages/api/backend/stripeInstance";
import { ISubscription } from "../../../../redux/types/subscriptionTypes";
import styles from "./StripeSubscription.module.css";

const BasicProductDisplay = (): ReactElement => {
    const {data: session } = useSession();
    const {push, asPath} = useRouter();
    const [publicKeyStripe, setPublicKeyStripe] = useState("");
    const [priceBasicProduct, setPriceBasicProduct] = useState("");
    const [priceAdvancedProduct, setPriceAdvancedProduct] = useState(""); 

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
    }, [session]);
  
    if (!publicKeyStripe && !priceBasicProduct && !priceAdvancedProduct) {
        return <div>Loading...</div>
    };

    const stripePromise = loadStripe(publicKeyStripe);

    const handlerClick = async (priceKey: string) => {
        let email: string;
        let customer_id: string;
        const subscription: ISubscription = session.subscription;
        if (session){ 
            email = session.user.email;
            customer_id = subscription.customer_id;
        };
        const {sessionStripe, sessionId, customerId} = await fetch('/api/checkout/session', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({quantity: 1, email: email, product_price: priceKey, customer_id: customer_id})
        }).then(res => res.json());
        const stripe = await stripePromise;

        const dataSessionToDB = {
            session: sessionStripe,
            email: email,
            basic_product_key: priceKey,
            stripe_customer: customerId,
            stripe_session_id: sessionId,
        }

        const saveSessionToDB = async() => await stripeApi.createSessionStripe(dataSessionToDB)
        saveSessionToDB();
        const { error } = await stripe.redirectToCheckout({sessionId});
    };

    console.log("session ", session);
    
    
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

            {/* <section className={styles.subProductContainer}>
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
            </section> */}
        </div>
    )
};

export default BasicProductDisplay;
