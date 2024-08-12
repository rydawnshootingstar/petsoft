'use client';
import Image from 'next/image';
import Logo from './logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

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
								className={cn(
									'text-white/70 rounded-sm px-2 py-1 hover:text-white focus:text-white transition',
									{
										'bg-black/10 text-white': path === activePathname,
									}
								)}
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
