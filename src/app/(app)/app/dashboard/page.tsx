import Stats from '@/components/Stats';
import Branding from '@/components/Branding';
import SearchForm from '@/components/SearchForm';
import PetDetails from '@/components/PetDetails';
import PetList from '@/components/PetList';
import ContentBlock from '@/components/ContentBlock';
import PetButton from '@/components/PetButton';

/*
	Data used in one component can be fetched and passed its parent page server component like this one:
		const petListRes = await fetch('https://bytegrad.com/course-assets/projects/petsoft/api/pets');
		if (!petListRes.ok) {
			throw new Error('Could not fetch pet list');
		}
		const petList:Pet[] = await petListRes.json();

	and then:
		<PetList pets={petList} />

	and finally in PetList:
		export default function PetList({pets}:{pets: PetListProps}) {...pets.map((pet, index))=> {...}...}

	but since we want the data in multiple components, we'll use the context api
*/

export default async function DashboardHome() {
	return (
		<main>
			<div className="flex items-center justify-between text-white py-8">
				<Branding />
				<Stats />
			</div>
			<div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_500px] gap-4 md:h-[600px]">
				<div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
					<SearchForm />
				</div>
				<div className="relative md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
					<ContentBlock className="bg-more-faded-grey max-h-[600px] overflow-auto overflow-y-scroll">
						<PetList />

						<PetButton className="absolute bottom-4 right-4" actionType={'add'} />
					</ContentBlock>
				</div>
				<div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
					<ContentBlock>
						<PetDetails />
					</ContentBlock>
				</div>
			</div>
		</main>
	);
}
