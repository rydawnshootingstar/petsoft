'use client';

import { useSearchContext } from '@/lib/hooks';

export default function SearchForm() {
	const { searchQuery, handleChangeSearchQuery } = useSearchContext();
	return (
		<form className="w-full h-full">
			<input
				className="w-full h-full bg-white/40 rounded-md px-5 outline-none transition focus:bg-white/20 hover:bg-white/30 placeholder:text-white/80"
				placeholder="Search for pets"
				type="search"
				value={searchQuery}
				onChange={(e) => handleChangeSearchQuery(e.target.value)}
			/>
		</form>
	);
}
