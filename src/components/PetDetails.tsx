'use client';

import { usePetContext } from '@/lib/hooks';
import Image from 'next/image';
import { PetComplete } from '@/lib/types';
import PetButton from './PetButton';
// NOTE: normal mode
// import { useTransition } from 'react';

/*
	useTransition was used here for a server action called outside a form for non-form loading state. It is unused since moving 
	to the optimistic ui pattern. 
*/

export default function PetDetails() {
	let { activePet } = usePetContext();
	return (
		<section className="flex bg-black/5 flex-col h-full w-full">
			{!activePet ? (
				<EmptyView />
			) : (
				<>
					<TopBar activePet={activePet} />
					<AdditionalInfo activePet={activePet} />
					<Notes activePet={activePet} />
				</>
			)}
		</section>
	);
}

function EmptyView() {
	return (
		<div className="h-full flex items-center justify-center">
			<p className="text-2xl font-medium ">Select a pet</p>
		</div>
	);
}

type Props = {
	activePet: PetComplete;
};

function TopBar({ activePet }: Props) {
	const { handleCheckoutPet } = usePetContext();
	// NOTE: normal mode
	// const [isPending, startTransition] = useTransition();
	return (
		<div className={'flex items-center bg-white px-8 py-5 border-b border-faded-grey'}>
			<Image
				src={activePet?.imageUrl}
				alt="pet pic"
				height={75}
				width={75}
				className="h-[75px] w-[75px] rounded-full object-cover"
			/>

			<h2 className="text-3xl font-semibold leading-7 ml-5">{activePet?.name}</h2>
			<div className="ml-auto space-x-2 ">
				<PetButton actionType="edit" />
				<PetButton
					actionType="checkout"
					// NOTE: normal mode
					// disabled={isPending}
					onClick={async () => {
						await handleCheckoutPet(activePet.id);
					}}
				/>
			</div>
		</div>
	);
}

function AdditionalInfo({ activePet }: Props) {
	return (
		<div className="flex justify-around py-10 px-5 text-center">
			<div className="">
				<h3 className="text-[13px] font-medium uppercase text-zinc-700">Owner Name</h3>
				<p className="mt-1 text-lg text-zinc-800">{activePet?.ownerName}</p>
			</div>
			<div className="">
				<h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
				<p className="mt-1 text-lg text-zinc-800">{activePet?.age}</p>
			</div>
		</div>
	);
}

function Notes({ activePet }: Props) {
	return (
		<section className="flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-faded-grey">
			{activePet?.notes}
		</section>
	);
}
