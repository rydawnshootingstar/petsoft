'use client';

import { logIn, signUp } from '@/actions/actions';
import { Input } from './ui/input';
import { Label } from './ui/label';
import AuthFormButton from './AuthFormButton';
import { useFormState } from 'react-dom';

/*
	Native HTML validation is a fine alternative to react-hook-form for a small form like this. 

	Server validation is actually done in both actions.ts and in auth.ts

	Using the useFormState() hook is a little confusing, but we are able to retain some progressive enhancement.
	We do get an additional parameter coming in to our server action by doing this: prevState, which holds the previous
	error. 
*/

export default function AuthForm({ type }: { type: 'login' | 'signup' }) {
	const [signUpError, dispatchSignUp] = useFormState(signUp, undefined); // (serverAction, initialState)
	const [logInError, dispatchLogIn] = useFormState(logIn, undefined); // (serverAction, initialState)
	return (
		<form className="space-y-2 w-[250px]" action={type === 'login' ? dispatchLogIn : dispatchSignUp}>
			<div className="space-y-1">
				<Label htmlFor="email">Email</Label>
				<Input className="border-zinc-300" id="email" name="email" type="email" required maxLength={100} />
			</div>
			<div className="space-y-1">
				<Label htmlFor="password">Password</Label>
				<Input
					className="border-zinc-300"
					id="password"
					type="password"
					name="password"
					required
					maxLength={100}
				/>
			</div>
			<div>
				<AuthFormButton type={type} />
				{signUpError && <p className="text-red-500 text-sm mt-2">{signUpError.message}</p>}
				{logInError && <p className="text-red-500 text-sm mt-2">{logInError.message}</p>}
			</div>
		</form>
	);
}
