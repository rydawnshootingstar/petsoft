import PetContextProvider from '@/contexts/PetContextProvider';
import SearchContextProvider from '@/contexts/SearchContextProvider';
import { getPetsByUserId, sessionCheck } from '@/lib/serverOnlyUtils';
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

/* 
	ISSUE: if a user logs in then tries to add or edit a pet, the path isn't properly revalidated(?). It works upon refresh. 
	The server action is actually not being reached at all? it does trigger a GET of /app/dashboard in the console. There are no errors
	anywhere
*/

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	// authentication check. redirects to /login if not found
	const session = await sessionCheck();

	const petList = await getPetsByUserId(session.user.id);
	//const petList = await prisma.pet.findMany({ where: { userId: session.user.id } });

	return (
		<>
			<SearchContextProvider>
				<PetContextProvider petList={petList}>{children}</PetContextProvider>
			</SearchContextProvider>
			{/* <StoreProvider>{children}</StoreProvider> */}
		</>
	);
}
