"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/zodSchemas";
import { signIn, signOut } from "@/lib/auth";
import bcrypt from 'bcryptjs';

import { getPetById, sessionCheck } from "@/lib/serverOnlyUtils";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string);


/*
    Sleep function is used to simulate network delay for dev environment

    When next-auth's signIn does a redirect, it's actually throwing an error. If we invoke it in a try catch block, that error will be 
    caught. We need to throw it again.

*/

/*                  USER ACTIONS                 */
export async function signUp(prevState: unknown, authData: unknown) {   // prevState comes in from useFormState. We don't need it, but we need to satisfy TS
    // await sleep(2);

    // type check
    if (!(authData instanceof FormData)) {
        return { message: "Invalid form data." }
    }

    // conver to normal JS object for zod
    const authFormDataEntries = Object.fromEntries(authData.entries());

    // validation
    const validatedAuthData = authSchema.safeParse(authFormDataEntries);
    if (!validatedAuthData.success) {
        return { message: "Invalid form data." }
    }

    // hashing
    const hashedPassword = await bcrypt.hash(validatedAuthData.data.password, 10);

    // db action
    try {
        await prisma.user.create({
            data: {
                email: validatedAuthData.data.email,
                hashedPassword
            }
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return { message: "This email is already in use." }
            }
        }
        return { message: "There was a problem creating this account." }
    }

    // next-auth action
    try {
        await signIn('credentials', authData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin': { return { message: "Invalid Credentials." } };
                default: { return { message: "Could not sign in." } }
            }
        }
        throw error; // redirects from auth.ts throw error. rethrow it to actually continue
        // return { message: "There was a problem logging you in. This shouldn't happen, if the problem persists, please contact support." }
    }
}

export async function logIn(prevState: unknown, authData: unknown) {
    // await sleep(2);

    // type check
    if (!(authData instanceof FormData)) {
        return { message: "Invalid form data." }
    }
    // next-auth action
    try {
        await signIn('credentials', authData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin': { return { message: "Invalid Credentials." } };
                default: { return { message: "Could not sign in." } }
            }
        }
        throw error; // redirects from auth.ts throw error. rethrow it to actually continue
        // return { message: "There was a problem logging you in. This shouldn't happen, if the problem persists, please contact support." }
    }

}

export async function LogOut() {
    await signOut({ redirectTo: '/' });
}

/*                  PET ACTIONS                 */

export async function addPet(petData: unknown) {
    //  await sleep(2);

    // authentication check. redirects to /login if not found
    const session = await sessionCheck();

    // validation
    const validatedPetData = petFormSchema.safeParse(petData);
    if (!validatedPetData.success) {
        return { message: "Invalid pet data was recieved by the server." }
    }

    // db action
    try {
        await prisma?.pet.create({
            data: { ...validatedPetData.data, user: { connect: { id: session.user.id } } }
        });
    } catch (error) {
        return { message: "There was a problem adding this pet." }
    }

    revalidatePath('/app/dashboard', 'layout');
}

export async function editPet(petId: unknown, petData: unknown) {
    // await sleep(2);

    // authentication check. redirects to /login if not found
    const session = await sessionCheck();

    // validation
    const validatedPetData = petFormSchema.safeParse(petData);
    const validatedPetId = petIdSchema.safeParse(petId);
    if (!validatedPetData.success || !validatedPetId.success) {
        return { message: "Invalid pet data was recieved by the server." }
    }

    // authorization check
    let requestedPet;
    try {
        requestedPet = await getPetById(validatedPetId.data)
    } catch (error) {
        return { message: "There was a problem finding your pet." }
    }
    if (requestedPet!.userId !== session.user?.id) {
        return { message: "That's not your pet." }
    }

    // db action
    try {
        await prisma.pet.update({
            where: {
                id: validatedPetId.data
            },
            data:
                validatedPetData.data

        });
    } catch (error) {
        return { message: "There was a problem saving your updates." }
    }

    revalidatePath('/app/dashboard', 'layout');
}

export async function deletePet(petId: unknown) {
    // await sleep(2);

    // authentication check. redirects to /login if not found
    const session = await sessionCheck();

    // validation
    const validatedPetId = petIdSchema.safeParse(petId);
    if (!validatedPetId.success) {
        return { message: "No pet with this ID was found." }
    }

    // authorization check
    let requestedPet;
    try {
        requestedPet = await prisma.pet.findUnique({ where: { id: validatedPetId.data }, select: { userId: true } });
    } catch (error) {
        return { message: "There was a problem finding your pet." }
    }
    if (requestedPet!.userId !== session.user?.id) {
        return { message: "That's not your pet." }
    }

    // db action
    try {
        await prisma.pet.delete({ where: { id: validatedPetId.data } });
    } catch (error) {
        return { message: "There was a problem checking out your pet." }
    }

    revalidatePath('/app/dashboard', 'layout');
}

/*                  PAYMENT ACTIONS                 */

export async function createCheckoutSession() {
    // authentication check. redirects to /login if not found
    const session = await sessionCheck();

    const checkoutSession = await stripe.checkout.sessions.create({
        customer_email: session.user.email!,
        line_items: [{
            price: process.env.STRIPE_PETSOFT_PRICE_ID,
            quantity: 1
        }],
        mode: "payment",
        success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
        cancel_url: `${process.env.CANONICAL_URL}/payment?cancelled=true`,

    });

    if (checkoutSession.url) {
        redirect(checkoutSession.url);
    }

}