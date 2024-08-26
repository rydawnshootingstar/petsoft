'use client';

import { PetComplete, PetEssentials } from '@/lib/types';
import { createContext, useOptimistic, useState } from 'react';
import { addPet, deletePet, editPet } from '@/actions/actions';
import { toast } from 'sonner';

/*
	We pass handler functions for changing the context's states instead of the raw setter functions to allow for any additional 
	functionality we want in the event of a user changing that piece of state. 
*/

type PetContextProviderProps = {
	petList: PetComplete[];
	children: React.ReactNode;
};

type TPetContext = {
	optimisticPets: PetComplete[];
	activePetId: PetComplete['id'] | null;
	activePet: PetComplete | undefined;
	numberOfGuests: number;
	handleChangeActivePetId: (id: PetComplete['id']) => void;
	handleCheckoutPet: (id: PetComplete['id']) => Promise<void>;
	handleAddPet: (pet: PetEssentials) => Promise<void>;
	handleEditPet: (petId: PetComplete['id'], changes: PetEssentials) => Promise<void>;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({ petList, children }: PetContextProviderProps) {
	// state
	const [activePetId, setActivePetId] = useState<string | null>(null);
	// NOTE: optimistic mode
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
				return state;
		}
	});

	// derived state
	const activePet = optimisticPets.find((pet) => pet.id === activePetId);
	const numberOfGuests = optimisticPets ? optimisticPets.length : 0;

	// event handlers and actions
	const handleChangeActivePetId = (id: PetComplete['id']) => {
		setActivePetId(id);
	};

	const handleAddPet = async (newPet: PetEssentials) => {
		// NOTE: optimistic mode
		setOptimisticPets({ action: 'add', payload: newPet });
		const error = await addPet(newPet); // we only get a response returned if there's an error
		if (error) {
			toast.warning(error.message);
			return;
		}
	};

	const handleEditPet = async (petId: PetComplete['id'], changes: PetEssentials) => {
		// NOTE: optimistic mode
		setOptimisticPets({ action: 'edit', payload: { id: petId, changes } });
		const error = await editPet(petId, changes); // we only get a response returned if there's an error
		if (error) {
			toast.warning(error.message);
			return;
		}
	};

	const handleCheckoutPet = async (petId: PetComplete['id']) => {
		// NOTE: optimistic mode
		setOptimisticPets({ action: 'delete', payload: petId });
		const error = await deletePet(petId); // we only get a response returned if there's an error
		if (error) {
			toast.warning(error.message);
			return;
		}
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
