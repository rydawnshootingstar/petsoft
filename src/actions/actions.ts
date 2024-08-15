"use server";

import { PetComplete, PetEssentials } from "@/lib/types";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";
import { petFormSchema, petIdSchema } from "@/lib/zodSchemas";

/*
    sleep function is used to simulate network delay
*/

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