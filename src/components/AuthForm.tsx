import { logIn, signUp } from '@/actions/actions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function AuthForm({ type }: { type: 'login' | 'signup' }) {
	return (
		<form className="space-y-2 w-[250px]" action={type === 'login' ? logIn : signUp}>
			<div className="space-y-1">
				<Label htmlFor="email">Email</Label>
				<Input className="border-zinc-300" id="email" name="email" />
			</div>
			<div className="space-y-1">
				<Label htmlFor="password">Password</Label>
				<Input className="border-zinc-300" id="password" type="password" name="password" />
			</div>
			<div>
				<Button className="mt-4">{type === 'login' ? 'Log In' : 'Sign Up'}</Button>
			</div>
		</form>
	);
}
