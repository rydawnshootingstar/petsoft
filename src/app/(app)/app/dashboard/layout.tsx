import PetContextProvider from '@/contexts/PetContextProvider';
import SearchContextProvider from '@/contexts/SearchContextProvider';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
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
	const session = await auth();

	if (!session?.user) {
		redirect('/login');
	}

	const petList = await prisma.pet.findMany({ where: { userId: session?.user.id } });

	return (
		<>
			<SearchContextProvider>
				<PetContextProvider petList={petList}>{children}</PetContextProvider>
			</SearchContextProvider>
			{/* <StoreProvider>{children}</StoreProvider> */}
		</>
	);
}
