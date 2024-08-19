"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";
import { petFormSchema, petIdSchema } from "@/lib/zodSchemas";
import { signIn, signOut } from "@/lib/auth";
import bcrypt from 'bcryptjs';

/*
    sleep function is used to simulate network delay
*/

/*                  USER ACTIONS                 */
export async function signUp(authData: FormData) {
    const authDataFormatted = Object.fromEntries(authData.entries());
    const hashedPassword = await bcrypt.hash(authDataFormatted.password as string, 10);

    await prisma.user.create({
        data: {
            email: authDataFormatted.email,
            hashedPassword
        }
    });

    await signIn('credentials', authDataFormatted);


}

export async function logIn(authData: FormData) {
    const authDataFormatted = Object.fromEntries(authData.entries());
    await signIn('credentials', authDataFormatted);

}

export async function LogOut() {
    await signOut({ redirectTo: '/' });
}

/*                  PET ACTIONS                 */

export async function addPet(petData: unknown) {
    //  await sleep(2);

    const validatedPetData = petFormSchema.safeParse(petData);
    if (!validatedPetData.success) {
        return { message: "Invalid pet data was recieved by the server." }
    }

    try {
        await prisma?.pet.create({
            data: validatedPetData.data
        });
    } catch (error) {
        return { message: "There was a problem adding this pet." }
    }

    revalidatePath('/app/dashboard', 'layout');
}

export async function editPet(petId: unknown, petData: unknown) {
    // await sleep(2);
    const validatedPetData = petFormSchema.safeParse(petData);
    const validatedPetId = petIdSchema.safeParse(petId);
    if (!validatedPetData.success || !validatedPetId.success) {
        return { message: "Invalid pet data was recieved by the server." }
    }

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

    const validatedPetId = petIdSchema.safeParse(petId);
    if (!validatedPetId.success) {
        return { message: "No pet with this ID was found." }
    }

    try {
        await prisma.pet.delete({ where: { id: validatedPetId.data } });
    } catch (error) {
        return { message: "There was a problem checking out your pet." }
    }

    revalidatePath('/app/dashboard', 'layout');
}

