import PetContextProvider from '@/contexts/PetContextProvider';
import SearchContextProvider from '@/contexts/SearchContextProvider';
import { getPetsByUserId, sessionCheck } from '@/lib/serverOnlyUtils';

/* 
    Flow: mark this layout async, fetch the data, pass it in the provider. In the PetContextProvider.tsx, accept the data as a 
    prop, set the prop as state, pass the state to the wrapper. 
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
		</>
	);
}
