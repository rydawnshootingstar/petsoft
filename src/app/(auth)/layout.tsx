import Logo from '@/components/logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex bg-white flex-col m-0 items-center justify-center min-h-screen gap-y-5">
			<Logo className="justify-center" size={'40%'} />

			{children}
		</div>
	);
}
