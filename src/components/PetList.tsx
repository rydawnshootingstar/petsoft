'use client';

import { usePetContext, useSearchContext } from '@/lib/hooks';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

/*
	ISSUE: Router check and push are here because the redirect attempted in auth.ts only partially works. They're 
	redirected but the URL isn't properly replaced, and so a newly logged in user can't use the server action. It POSTS
	to /login or /signup with doesn't work. Don't render PetList outside of the dashboard without changing. 
*/

export default function PetList() {
	const path = usePathname();
	const router = useRouter();
	useEffect(() => {
		if (!path.includes('dashboard')) {
			router.push('/app/dashboard');
		}
	}, []);
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
