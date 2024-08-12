'use client';
import { Pet } from '@/lib/types';
import { createContext, useState } from 'react';

/*
	We pass a handler function for changing the activePetId instead of the raw setActivePetId to allow for any future functionality we want
	in the action of a user changing that piece of state. 
*/

type PetContextProviderProps = {
	petList: Pet[];
	children: React.ReactNode;
};

type TPetContext = {
	pets: Pet[];
	activePetId: string | null;
	activePet: Pet | undefined;
	numberOfGuests: number;
	handleChangeActivePetId: (id: string) => void;
	handleCheckoutPet: (id: string) => void;
	handleAddPet: (pet: Pet) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({ petList, children }: PetContextProviderProps) {
	// state
	const [pets, setPets] = useState(petList);
	const [activePetId, setActivePetId] = useState<string | null>(null);

	// derived state
	const activePet = pets.find((pet) => pet.id === activePetId);
	const numberOfGuests = pets ? pets.length : 0;

	// event handlers and actions
	const handleChangeActivePetId = (id: string) => {
		setActivePetId(id);
	};

	const handleCheckoutPet = (id: string) => {
		setPets((prev) => prev.filter((pet) => pet.id !== id));
		setActivePetId(null); // not strictly necessary, but just to be safe
	};

	const handleAddPet = (pet: Pet) => {
		setPets((prev) => [...prev, pet]);
	};

	return (
		<PetContext.Provider
			value={{
				pets,
				activePetId,
				activePet,
				numberOfGuests,
				handleChangeActivePetId,
				handleCheckoutPet,
				handleAddPet,
			}}
		>
			{children}
		</PetContext.Provider>
	);
}
