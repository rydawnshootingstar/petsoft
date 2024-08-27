import Image from 'next/image';
import logo from '../../public/catPawBig.png';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoSizeProps = {
	size: string;
	className?: string;
};

export default function Logo({ size, className }: LogoSizeProps) {
	return (
		<Link className={cn('flex w-fit justify-start items-center', className)} href="/">
			<Image
				src={logo}
				alt={'PetSoft Logo'}
				width={0}
				height={0}
				//sizes="100vw"
				style={{ width: `${size}`, height: 'auto' }}
			/>
		</Link>
	);
}
