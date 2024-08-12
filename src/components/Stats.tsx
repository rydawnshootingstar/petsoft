'use client';

import { usePetContext } from '@/lib/hooks';

export default function Stats() {
	let { numberOfGuests } = usePetContext();
	return (
		<section className="">
			<p className="text-4xl font-bold leading-8">{numberOfGuests}</p>
			<p className="opacity-70">current guests</p>
		</section>
	);
}
