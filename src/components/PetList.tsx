'use client';
import { usePetContext, useSearchContext } from '@/lib/hooks';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function PetList() {
	const { optimisticPets, activePetId, handleChangeActivePetId } = usePetContext();
	const { searchQuery } = useSearchContext();
	const filteredPets = optimisticPets.filter((pet) => pet.name.toLowerCase().includes(searchQuery.toLowerCase()));

	return (
		<ul className="bg-white border-b border-faded-grey">
			{filteredPets.map((pet, index) => {
				return (
					<li key={index}>
						<button
							onClick={() => handleChangeActivePetId(pet.id)}
							className={cn(
								'flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#eff1f2] focus:bg-[#eff1f2] transition',
								{
									'bg-[#eff1f2]': activePetId === pet.id,
								}
							)}
						>
							{/* NOTE: Next really uses the width and height values to set a ratio for the image. To actually use a fixed height, add it to the css */}
							<Image
								src={pet.imageUrl}
								alt="Pet Image"
								width={45}
								height={45}
								className="w-[45px] h-[45px] rounded-full object-cover"
							/>
							<p className="font-semibold">{pet.name}</p>
						</button>
					</li>
				);
			})}
		</ul>
	);
}
