import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import styles from "./StripeSubscription.module.css";

const BasicProductDisplay = () => {
    const {data : session } = useSession();
    const {push, asPath} = useRouter();
    const [publicKeyStripe, setPublicKeyStripe] = useState("");
    useEffect(() => {
        fetch('/api/keys', {
            method: 'GET',
            headers: {'Content-type': 'application/json'},
        })
            .then((res) => res.json())
            .then((data) => {
                setPublicKeyStripe(data.publishableKey)
            })
    }, []);

    if (!publicKeyStripe) {
        return <div>Loading...</div>
    };

    const stripePromise = loadStripe(publicKeyStripe);
    console.log(" stripePromise ", stripePromise);
    

    const handlerClick = async () => {

        const {sessionId, customer} = await fetch('/api/checkout/session', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({quantity: 1, email: session ? session.user.email : ""})
        }).then(res => res.json());
        

        const stripe = await stripePromise;
        
        const { error } = await stripe.redirectToCheckout({sessionId});
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
