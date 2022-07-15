import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET') res.status(405).end('Method not allowed');

    res.status(200).json({
        publishableKey:  process.env.STRIPE_PUBLISHABLE_KEY,
        priceBasicProduct:  process.env.BASIC_PRICE_LOOKUP_KEY,
        priceAdvancedProduct:  process.env.ADVANCE_PRICE_LOOKUP_KEY,
    });
};
