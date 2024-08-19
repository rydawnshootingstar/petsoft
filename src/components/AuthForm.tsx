import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function AuthForm() {
	return (
		<form className="space-y-2 w-[250px]">
			<div className="space-y-1">
				<Label htmlFor="email">Email</Label>
				<Input className="border-zinc-300" id="email" />
			</div>
			<div className="space-y-1">
				<Label htmlFor="password">Password</Label>
				<Input className="border-zinc-300" id="password" />
			</div>
			<div>
				<Button className="mt-4">Log In</Button>
			</div>
		</form>
	);
}
