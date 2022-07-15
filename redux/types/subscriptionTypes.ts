export interface ISubscription {
    cancel_at_period_end?: boolean,
    created_at?: string,
    customer_id?: string,
    email?: string,
    id?: number,
    image?: string,
    product_id?: string,
    role?: string,
    session_id?: string,
    subscription_id?: string,
    surveys?: []
    type?: string,
    username?: string,
    uuid?: string,
}