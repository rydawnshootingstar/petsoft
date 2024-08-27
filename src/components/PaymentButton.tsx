'use client';

import { Button } from './ui/button';
import { useTransition } from 'react';
import Image from 'next/image';
import widetime from '../../public/widetime.gif';
import { createCheckoutSession } from '@/actions/actions';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

/*
	useTransition() hook gives us pending state for a component that's not inside a form. The server action must be wrapped in
	startTransition()

	TEMP FIX(?): Router check and push are here because the redirect attempted in auth.ts only partially works. They're 
	redirected but the URL isn't properly replaced, and so a newly logged in user can't use the server action. It POSTS
	to /signup which doesn't work. Don't render PaymentButton outside of the payment page without changing. 
*/

export default function PaymentButton() {
	const path = usePathname();
	const router = useRouter();
	useEffect(() => {
		if (!path.includes('payment')) {
			router.push('/payment');
		}
	}, []);
	const [isPending, startTransition] = useTransition();
	return (
		<Button
			disabled={isPending}
			className="mt-10  bg-darker-green text-white hover:bg-green"
			onClick={async () => {
				startTransition(async () => {
					await createCheckoutSession();
				});
			}}
		>
			{isPending ? (
				<Image className="h-auto w-full" alt={'loading'} src={widetime} height={0} width={0} />
			) : (
				'Buy Lifetime Access'
			)}
		</Button>
	);
}
