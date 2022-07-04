import { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe';
import { stripeApi } from "../backend/stripeInstance";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {quantity, email } = req.body;

        const customer = await stripe.customers.create({
            description: 'Customer created ',
            email: email,
          });


        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ['card'],
            billing_address_collection: 'auto',
            line_items: [{
                price: process.env.BASIC_PRICE_LOOKUP_KEY,
                quantity,
            }],
            // customer_email: email,
            customer: customer.id as string,
            mode: 'subscription',
            success_url: `${process.env.NEXTAUTH_URL}/user_profile/survey/setting?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/user_profile/survey/setting?canceled=true`,
        });
          

        const dataSessionToDB = {
            email: email,
            basic_product_key: process.env.BASIC_PRICE_LOOKUP_KEY,
            stripe_customer: customer.id,
            stripe_session_id: session.id,
        }

        const saveSessionToDB = async() => await stripeApi.createSessionStripe(dataSessionToDB)
        saveSessionToDB();

        res.status(200).json({ sessionId: session.id, customer: customer.id})

    } catch (e) {
        console.error(e);
        res.status(400).json({
            code: 'customer and session failed',
            error: e,
        });
    }
    
};
