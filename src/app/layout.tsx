import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'PetSoft - Pet Daycare Software',
	description: "Take care of your clients' pets responsibly with PetSoft",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={'bg-orange min-h-screen'}>
				<SessionProvider>{children}</SessionProvider>
			</body>
		</html>
	);
}
