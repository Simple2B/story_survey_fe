import { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe';
import { stripeApi } from "../backend/stripeInstance";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'});


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {id, email} = req.query;
    console.log("ID", id);
    
    const session = await stripe.checkout.sessions.retrieve(id as string, {expand: ["payment_intent"]});
    
    res.status(200).json({ session });

};
