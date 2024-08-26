/*
    Accept incoming webhook data from stripe 
*/
import prisma from "@/lib/db";
import Stripe from 'stripe';



export async function POST(req: Request) {
    const bodyData = await req.text();
    const signature = req.headers.get('stripe-signature') as string;

    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string);

    // veryify that webhook comes from Stripe
    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(bodyData, signature, process.env.STRIPE_WEBHOOK_SECRET as string);
    } catch (error) {
        console.error('webhook verification failed', error);
        return Response.json(null, { status: 400 });
    }

    // fulfill order

    // TODO: set up webhook and inspect how this looks. look for customer object with email attribute
    async function handleCheckoutSessionCompleted(event: Stripe.CheckoutSessionCompletedEvent) {
        try {
            await prisma.user.update({
                where: {
                    email: event.data.object.customer_email!
                }, data: {
                    hasAccess: true
                }
            })
        } catch (error) {
            return new Response(`Webhook Error: ${error}`, { status: 400 })
        }
    }

    switch (event.type) {
        case "checkout.session.completed":
            return handleCheckoutSessionCompleted(event)
        default:
            return console.log(`Unhandled event type ${event.type}`);
    }



    return Response.json(null, { status: 200 });
}