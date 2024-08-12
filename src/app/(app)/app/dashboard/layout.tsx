import PetContextProvider from '@/contexts/PetContextProvider';
import SearchContextProvider from '@/contexts/SearchContextProvider';
import { Pet } from '@/lib/types';
//import StoreProvider from '@/store/StoreProvider';

/* 
    Jotai usually doesn't need to use a provider, but since we're in NextJS, we want to use SSR as much as possible. In order to do this, 
    we need to create a provider and wrap the relevant components (all in page) in it. 

    To use state in a server component, we can use hydrateAtom

*/

/* 
    Context option: mark the layout async, fetch the data, pass it in the provider. In the PetContextProvider.tsx, accept the data as a 
    prop, set the prop as state, pass the state to the wrapper. 

*/

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const petListRes = await fetch('https://bytegrad.com/course-assets/projects/petsoft/api/pets');
	if (!petListRes.ok) {
		throw new Error('Could not fetch pet list');
	}
	const petList: Pet[] = await petListRes.json();
	return (
		<>
			<SearchContextProvider>
				<PetContextProvider petList={petList}>{children}</PetContextProvider>
			</SearchContextProvider>
			{/* <StoreProvider>{children}</StoreProvider> */}
		</>
	);
}
