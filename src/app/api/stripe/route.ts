/*
    Accept incoming webhook data from stripe 
*/
import prisma from "@/lib/db";
import Stripe from 'stripe';



export async function POST(req: Request) {
    const bodyData = await req.text();
    const signature = req.headers.get('stripe-signature');

    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

    console.log(bodyData);

    // veryify that webhook comes from Stripe
    let event;
    try {
        event = stripe.webhooks.constructEvent(bodyData, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        console.error('webhook verification failed', error);
        return Response.json(null, { status: 400 });
    }

    // fulfill order

    async function handleCheckoutSessionCompleted(event) {
        await prisma.user.update({
            where: {
                email: event.data.object.customer_email
            }, data: {
                hasAccess: true
            }
        })
    }

    switch (event.type) {
        case "checkout.session.completed":
            return handleCheckoutSessionCompleted(event)
        default:
            return console.log(`Unhandled event type ${event.type}`);
    }



    return Response.json(null, { status: 200 });
}