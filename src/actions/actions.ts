"use server";

import { Pet } from "@/lib/types";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";

export async function addPet(petData: Omit<Pet, 'id'>) {
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

export async function editPet(petId: string, petData: Omit<Pet, 'id'>) {
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

export async function deletePet(petId: string) {
    // await sleep(2);

    try {
        await prisma.pet.delete({ where: { id: petId } });
    } catch (error) {
        return { message: "There was a problem checking out your pet." }
    }

    revalidatePath('/app/dashboard', 'layout');
}