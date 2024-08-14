'use client';

import { Pet } from '@/lib/types';
import { createContext, useOptimistic, useState } from 'react';
import { addPet, deletePet, editPet } from '@/actions/actions';
import { toast } from 'sonner';

/*
	We pass a handler function for changing the activePetId instead of the raw setActivePetId to allow for any future functionality we want
	in the action of a user changing that piece of state. 
*/

type PetContextProviderProps = {
	petList: Pet[];
	children: React.ReactNode;
};

type TPetContext = {
	optimisticPets: Pet[];
	activePetId: string | null;
	activePet: Pet | undefined;
	numberOfGuests: number;
	handleChangeActivePetId: (id: string) => void;
	handleCheckoutPet: (id: string) => Promise<void>;
	handleAddPet: (pet: Omit<Pet, 'id'>) => Promise<void>;
	handleEditPet: (petId: string, changes: Omit<Pet, 'id'>) => Promise<void>;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({ petList, children }: PetContextProviderProps) {
	// state
	const [activePetId, setActivePetId] = useState<string | null>(null);
	const [optimisticPets, setOptimisticPets] = useOptimistic(petList, (state, { action, payload }) => {
		switch (action) {
			case 'add':
				return [...state, payload];
			case 'edit':
				return state.map((pet) => {
					if (pet.id === payload.id) {
						return { ...pet, ...payload.changes };
					}
					return pet;
				});
			case 'delete':
				return state.filter((pet) => pet.id !== payload);
			default:
				return;
		}
	});

	// derived state
	const activePet = optimisticPets.find((pet) => pet.id === activePetId);
	const numberOfGuests = optimisticPets ? optimisticPets.length : 0;

	// event handlers and actions
	const handleChangeActivePetId = (id: string) => {
		setActivePetId(id);
	};

	const handleAddPet = async (newPet: Omit<Pet, 'id'>) => {
		setOptimisticPets({ action: 'add', payload: newPet });
		const error = await addPet(newPet); // we only get a response returned if there's an error
		if (error) {
			toast.warning(error.message);
			return;
		}
	};

	const handleEditPet = async (petId: string, changes: Omit<Pet, 'id'>) => {
		setOptimisticPets({ action: 'edit', payload: { id: petId, changes } });
		const error = await editPet(petId, changes);
		if (error) {
			toast.warning(error.message);
			return;
		}
	};

	const handleCheckoutPet = async (petId: string) => {
		setOptimisticPets({ action: 'delete', payload: petId });
		await deletePet(petId);
		setActivePetId(null);
	};

	return (
		<PetContext.Provider
			value={{
				optimisticPets,
				activePetId,
				activePet,
				numberOfGuests,
				handleChangeActivePetId,
				handleCheckoutPet,
				handleAddPet,
				handleEditPet,
			}}
		>
			{children}
		</PetContext.Provider>
	);
}
