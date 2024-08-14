"use server";

import { PetComplete, PetEssentials } from "@/lib/types";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";

/*
    sleep function is used to simulate network delay
*/

export async function addPet(petData: PetEssentials) {
    //  await sleep(2);

    try {
        await prisma?.pet.create({
            data: petData
        });
    } catch (error) {
        return { message: "There was a problem adding this pet." }
    }

    revalidatePath('/app/dashboard', 'layout');
}

export async function editPet(petId: PetComplete['id'], petData: PetEssentials) {
    // await sleep(2);

    try {
        await prisma.pet.update({
            where: {
                id: petId
            },
            data:
                petData

        });
    } catch (error) {
        return { message: "There was a problem saving your updates." }
    }

    revalidatePath('/app/dashboard', 'layout');
}

export async function deletePet(petId: PetComplete['id']) {
    // await sleep(2);

    try {
        await prisma.pet.delete({ where: { id: petId } });
    } catch (error) {
        return { message: "There was a problem checking out your pet." }
    }

    revalidatePath('/app/dashboard', 'layout');
}