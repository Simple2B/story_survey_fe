import { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {session_id} = req.body;
        const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
        // This is the url to which the customer will be redirected when they are done
        // managing their billing with the portal.
        const returnUrl = `${process.env.NEXTAUTH_URL}/user_profile/survey/setting`;
        const portalSession = await stripe.billingPortal.sessions.create({
          customer: checkoutSession.customer as string,
          return_url: returnUrl,
        });
        // res.redirect(portalSession.url);
        res.status(200).json({ url:  portalSession.url})
        // Optional but recommended
        // Save the customer object or ID to your database
        res.status(200).json({
            code: 'portal created',
            portalSession,
        });
    } catch (e) {
        console.error(e);
        res.status(400).json({
            code: 'portal created failed',
            error: e,
        });
    }
    
};
