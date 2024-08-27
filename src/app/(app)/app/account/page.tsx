import ContentBlock from '@/components/ContentBlock';
import LogoutButton from '@/components/LogoutButton';
import SectionHeader from '@/components/SectionHeader';
import { sessionCheck } from '@/lib/serverOnlyUtils';

/*
		On a server component, we want to import the auth() function and grab the session. 

		Even though we theoretically would never get to this page without our middleware checking for a user, it's a good idea
		to do a session check in server components. 

		The Logout button was created because we need it to be interactive (a client component) but would prefer the rest of
		the page to be a server component. 
*/

export default async function Account() {
	// authentication check. redirects to /login if not found
	const session = await sessionCheck();

	return (
		<main>
			<SectionHeader className={'my-8 text-white'}>Your Account</SectionHeader>
			<ContentBlock className={'bg-more-faded-grey h-[500px] flex justify-center items-center flex-col gap-5'}>
				<p className="">Logged in as {session?.user?.email}</p>
				<LogoutButton></LogoutButton>
			</ContentBlock>
		</main>
	);
}
