import { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe';
import { stripeApi } from "../backend/stripeInstance";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'});

const BASIC_PRICE_LOOKUP_KEY = process.env.BASIC_PRICE_LOOKUP_KEY;
const ADVANCE_PRICE_LOOKUP_KEY = process.env.ADVANCE_PRICE_LOOKUP_KEY;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    //     return res.status(401).send('You are not authorized to call this API')
    // }
    try {
        const { email, product_price, quantity, customer_id } = req.body;

        const productPrice = product_price === BASIC_PRICE_LOOKUP_KEY ? BASIC_PRICE_LOOKUP_KEY : ADVANCE_PRICE_LOOKUP_KEY;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            line_items: [{
                price: productPrice,
                quantity: quantity,
            }],
            // customer_email: email,
            customer: customer_id,
            mode: 'subscription',
            success_url: `${process.env.NEXTAUTH_URL}/user_profile/survey/setting?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/user_profile/survey/setting?canceled=true`,
        });
        
        res.status(200).json({stripeSession: session, sessionId: session.id })

    } catch (e) {
        console.error(e);
        res.status(400).json({
            code: 'customer and session failed',
            error: e,
        });
    }
};
