'use client';

import { useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

/*
	Here we can get loading state from the useSession() hook. 
*/

export default function StartUsingPetSoftButton() {
	const { data: session, update, status } = useSession();
	const router = useRouter();
	return (
		<Button
			className="mt-5"
			disabled={status === 'loading' || session?.user.hasAccess}
			onClick={async () => {
				await update(true);
				router.push('/app/dashboard');
			}}
		>
			Continue
		</Button>
	);
}
