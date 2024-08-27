import "server-only";

import { redirect } from "next/navigation";
import { auth } from "./auth";
import { Pet, User } from "@prisma/client";
import prisma from './db';


/*
    Server Only (enforced via npm package) Functions
*/

// authentication check. redirects to /login if not found
export async function sessionCheck() {
    const session = await auth();
    if (!session?.user) {
        redirect("/login");
    }

    return session;
}

export async function getPetById(petId: Pet['id']) {
    const pet = await prisma.pet.findUnique({
        where: {
            id: petId
        }
    });
    return pet;
}

export async function getPetsByUserId(userId: User['id']) {
    const pets = await prisma.pet.findMany({
        where: {
            userId
        }, orderBy: {
            name: 'asc'
        }
    });
    return pets;
}

export async function getUserByEmail(email: User['email']) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return user;
}