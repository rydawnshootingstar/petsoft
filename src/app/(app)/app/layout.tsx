import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import BackgroundPattern from '@/components/BackgroundPattern';
import { Toaster } from '@/components/ui/sonner';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<BackgroundPattern />
			<div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
				<AppHeader />
				{children}
				<AppFooter />
			</div>
			<Toaster position="top-right" />
		</>
	);
}
