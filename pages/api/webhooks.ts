import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { stripeApi } from './backend/stripeInstance';

export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function webhookHandler(req: NextApiRequest, res: NextApiResponse) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: "2020-08-27"});
    if(req.method === 'POST') {
        const buf = await buffer(req);
        const sig = req.headers['stripe-signature'];
        const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;
        let event;
        let subscription;
        let status;
        try {
            if (!sig || !webhookSecret) return;
            event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
            switch (event.type) {  
                case 'payment_intent.succeeded':
                        // created user in db 
                    const paymentIntent = event.data.object;
                    console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
                    // Then define and call a method to handle the successful payment intent.
                    // handlePaymentIntentSucceeded(paymentIntent);
                break;
                case 'payment_method.attached':
                    const paymentMethod = event.data.object;
                    console.log(" paymentMethod ", paymentMethod);
                    
                    // Then define and call a method to handle the successful attachment of a PaymentMethod.
                    // handlePaymentMethodAttached(paymentMethod);
                break;

                case 'payment_method.update':
                
                break;

                case 'payment_method.update':
                
                break;

                case "payment_intent.canceled":
                    subscription = event.data.object;
                    status = subscription.status;
                    console.log(`Subscription canceled status is ${status}.`);
                    console.log("subscription canceled object", subscription);
                    // await stripe.subscriptions.del(subscription.id);
                    // await stripeApi.deleteSubscriptionStripe({subscription_id: subscription.id});
                break;

                case "customer.subscription.created":
                    subscription = event.data.object;
                    status = subscription.status;
                    console.log(`Subscription created status is ${status}.`);

                    console.log("subscription created object", subscription.id);
                    const saveSubscriptionToDB = async() => await stripeApi.createSubscriptionStripe({
                        stripe_customer: subscription.customer,
                        subscription_id: subscription.id
                      })
                    saveSubscriptionToDB();
                break;

                case "customer.subscription.deleted":
                    subscription = event.data.object;
                    status = subscription.status;
                    console.log(`Subscription status is ${status}.`);

                    console.log("subscription object", subscription);

                    await stripe.subscriptions.del(subscription.id);
                    await stripeApi.deleteSubscriptionStripe({subscription_id: subscription.id});
                    
                break;

                case 'customer.subscription.updated':
                    subscription = event.data.object;
                    status = subscription.status;
                    console.log(`Subscription status is ${status}.`);
                    console.log("subscription object", subscription);
                default:
                    // Unexpected event type
                    console.log(`Unhandled event type ${event.type}.`);
            }
        } catch (error) {
            console.log(`Webhook error: ${error.message}`);
            return res.status(400).send(`Webhook error: ${error.message}`);
        }
        console.log("webhookHandler: event ", event);
        return res.status(200).send(undefined);
    };
};
