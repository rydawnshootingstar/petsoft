import AuthForm from '@/components/AuthForm';
import SectionHeader from '@/components/SectionHeader';
import Link from 'next/link';

export default function SignUpPage() {
	return (
		<main>
			<SectionHeader className="text-center mb-2">Sign Up</SectionHeader>
			<AuthForm type="signup" />
			<p className="mt-4">
				Already have an account?{' '}
				<Link className="text-zinc-600 mt-6 font-medium" href="/login">
					Log In
				</Link>
				.
			</p>
		</main>
	);
}
