'use client';
import { Pet } from '@/lib/types';
import React, { createContext, useState } from 'react';

/*
	
*/

type TSearchContext = {
	searchQuery: string;
	handleChangeSearchQuery: (newValue: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({ children }: { children: React.ReactNode }) {
	// state
	const [searchQuery, setSearchQuery] = useState('');

	// derived state

	// event handlers and actions
	const handleChangeSearchQuery = (newValue: string) => {
		setSearchQuery(newValue);
	};

	return <SearchContext.Provider value={{ searchQuery, handleChangeSearchQuery }}>{children}</SearchContext.Provider>;
}
