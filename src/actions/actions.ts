"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/zodSchemas";
import { auth, signIn, signOut } from "@/lib/auth";
import bcrypt from 'bcryptjs';
import { redirect } from "next/navigation";
import { getPetById, sessionCheck } from "@/lib/serverOnlyUtils";

/*
    sleep function is used to simulate network delay
*/

/*                  USER ACTIONS                 */
export async function signUp(authData: unknown) {
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
    await prisma.user.create({
        data: {
            email: validatedAuthData.data.email,
            hashedPassword
        }
    });

    // next-auth action
    await signIn('credentials', authData);
}

export async function logIn(authData: unknown) {
    // type check
    if (!(authData instanceof FormData)) {
        return { message: "Invalid form data." }
    }
    // next-auth action
    await signIn('credentials', authData);
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

