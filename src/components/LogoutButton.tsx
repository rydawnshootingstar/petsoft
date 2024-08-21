'use client';

import { LogOut } from '@/actions/actions';
import { Button } from './ui/button';
import { useTransition } from 'react';
import Image from 'next/image';
import widetime from '../../public/widetime.gif';
/*
	useTransition() hook gives us pending state for a component that's not inside a form. The server action must be wrapped in
	startTransition()
*/

export default function LogoutButton() {
	const [isPending, startTransition] = useTransition();
	return (
		<Button
			onClick={async () => {
				startTransition(async () => {
					await LogOut();
				});
			}}
		>
			{isPending ? (
				<Image className="h-auto w-full" alt={'loading'} src={widetime} height={0} width={0} />
			) : (
				'Log Out'
			)}
		</Button>
	);
}
