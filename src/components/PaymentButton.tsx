'use client';

import { Button } from './ui/button';
import { useTransition } from 'react';
import Image from 'next/image';
import widetime from '../../public/widetime.gif';
import { createCheckoutSession } from '@/actions/actions';

/*
	useTransition() hook gives us pending state for a component that's not inside a form. The server action must be wrapped in
	startTransition()
*/

export default function PaymentButton() {
	const [isPending, startTransition] = useTransition();
	return (
		<Button
			disabled={isPending}
			className="mt-10"
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
