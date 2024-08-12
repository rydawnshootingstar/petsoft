'use client';
import Image from 'next/image';
import Logo from './logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
	{
		label: 'Dashboard',
		path: '/app/dashboard',
	},
	{
		label: 'Account',
		path: '/app/account',
	},
];

export default function AppHeader() {
	const activePathname = usePathname();
	return (
		<header className="flex justify-between items-center border-b border-white/4 py-2">
			<Logo />
			<nav>
				<ul className="flex gap-2 text-xs">
					{routes.map(({ path, label }, index) => {
						return (
							<Link
								key={index}
								href={path}
								className={
									'text-white/70 bg-black/10 rounded-sm px-2 py-1 hover:text-white focus:text-white transition'
								}
							>
								{label}
							</Link>
						);
					})}
				</ul>
			</nav>
		</header>
	);
}
