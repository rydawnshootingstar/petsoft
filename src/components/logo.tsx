import Image from 'next/image';
import logo from '../../public/catPawBig.png';
import Link from 'next/link';

export default function Logo() {
	return (
		<Link href="/">
			<Image
				src={logo}
				alt={'Catopia Logo'}
				width={0}
				height={0}
				sizes="100vw"
				style={{ width: '10%', height: 'auto' }}
			/>
		</Link>
	);
}
