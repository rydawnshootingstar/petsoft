import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";

/*
    NOTE: some of this like transform & coercion only works client side if we use onSubmit instead of a server action.
    It works on the server. age will actually come in as a string from the client
*/
export const petFormSchema = z
    .object({
        name: z.string().trim().min(1, { message: 'Name is required' }).max(100),
        ownerName: z.string().trim().min(1, { message: 'Owner Name is required' }).max(100),
        imageUrl: z.union([z.literal(''), z.string().trim().url({ message: 'Image url must be a valid url' })]),
        age: z.coerce.number().int().positive({ message: 'Pet must be born, cannot be over 200 years old' }).max(200, { message: 'Pet must be born, cannot be over 200 years old' }), // comes in as string by default
        notes: z.union([z.literal(''), z.string().trim().max(1000, { message: 'Your name is longer than 100 characters? Use a nickname!' })]),
    })
    .transform((data) => ({
        ...data,
        imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
    }));

// instead of manually creating a type, we can just use our schema
export type TPetForm = z.infer<typeof petFormSchema>;

export const petIdSchema = z.string().cuid();

export const authSchema = z.object({
    email: z.string().email().max(100),
    password: z.string().max(100)
});

export type TAuth = z.infer<typeof authSchema>;