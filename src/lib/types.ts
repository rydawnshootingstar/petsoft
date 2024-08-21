import { Pet } from "@prisma/client";

/*
    Our globally reused types are driven by our prisma model. Changes made to the model will persist automatically on our types. 

    If the model is changed, it will still create problems, but it's better to have them be typescript problems.

    Update PetEssentials whenever you update the schema. 
*/

export type PetEssentials = Omit<Pet, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;
export type PetComplete = Pet;

// currently not used
// export type PetWithId = Omit<Pet, 'updatedAt' | 'createdAt'>;

// Currently not used. This is a hardcoded type of pet that predates db implementation
// export type Pet = {
//     id: string;
//     name: string;
//     ownerName: string;
//     imageUrl: string;
//     age: number;
//     notes: string;
// }

// Currently not used. Pet[] is defined in PetList as its incoming prop type.
// export type Pets = Pet[];

