import Image from 'next/image';
import logo from '../../public/catPawBig.png';
import Link from 'next/link';

type LogoSizeProps = {
	size: string;
};

export default function Logo({ size }: LogoSizeProps) {
	return (
		<Link className="flex w-fit justify-center items-center" href="/">
			<Image
				src={logo}
				alt={'Catopia Logo'}
				width={0}
				height={0}
				//sizes="100vw"
				style={{ width: `${size}`, height: 'auto' }}
			/>
		</Link>
	);
}
