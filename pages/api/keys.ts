import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET') res.status(405).end('Method not allowed');

    res.status(200).json({
        publishableKey:  process.env.STRIPE_PUBLISHABLE_KEY,
    });
};
