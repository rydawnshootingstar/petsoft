import AuthForm from '@/components/AuthForm';
import SectionHeader from '@/components/SectionHeader';
import Link from 'next/link';

export default function LogInPage() {
	return (
		<main>
			<SectionHeader className="text-center mb-2">Log In</SectionHeader>
			<AuthForm type="login" />
			<p className="mt-4">
				No account yet?{' '}
				<Link className="text-zinc-600 mt-6 font-medium" href="/signup">
					Sign up
				</Link>
				.
			</p>
		</main>
	);
}
