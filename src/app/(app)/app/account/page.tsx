import ContentBlock from '@/components/ContentBlock';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';

export default function Account() {
	return (
		<main>
			<SectionHeader className={'my-8 text-white'}>Your Account</SectionHeader>
			<ContentBlock className={'h-[500px] flex justify-center items-center flex-col gap-5'}>
				<p className="">Logged in as ...</p>
				<Button>Log Out</Button>
			</ContentBlock>
		</main>
	);
}
