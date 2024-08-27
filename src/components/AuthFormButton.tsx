'use client';
import widetime from '../../public/widetime.gif';

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import Image from 'next/image';

export default function AuthFormButton({ type }: { type: 'login' | 'signup' }) {
	const { pending } = useFormStatus();
	return (
		<Button
			disabled={pending}
			id={type === 'login' ? 'login' : 'signup'}
			className="mt-4 bg-green text-white hover:bg-lighter-green"
		>
			{!pending && (type === 'login' ? 'Log In' : 'Sign Up')}
			{pending && <Image className="h-auto w-full" alt={'loading'} src={widetime} height={0} width={0} />}
		</Button>
	);
}
