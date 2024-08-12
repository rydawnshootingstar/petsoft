import { PetContext } from "@/contexts/PetContextProvider";
import { SearchContext } from "@/contexts/SearchContextProvider";
import { useContext } from "react";

export function usePetContext() {
    const context = useContext(PetContext);
    if (!context) {
        throw new Error('usePetContext must be used within a provder');
    }
    return context;
}

export function useSearchContext() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within a provider')
    }
    return context;
}