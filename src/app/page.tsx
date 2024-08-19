import Image from 'next/image';
import Link from 'next/link';
import Logo from '../components/logo';
import { Button } from '../components/ui/button';

export default function HomePage() {
	return (
		<main className="min-h-screen flex p-10 flex-col xl:flex-row items-center justify-center gap-10">
			<Image
				src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
				alt="Catopia Preview"
				width={519}
				height={472}
			/>
			<div>
				<Logo size={'100%'} />
				<h1 className="text-darker-grey text-5xl font-semibold my-6 max-w-[500px]">
					Manage your <span className="font-extrabold">Pet Daycare</span> with ease.
				</h1>
				<p className="text-2xl text-dark-grey font-medium max-w-[600px]">
					Use Catopia to easily keep track of the pets in your care. Get lifetime access for $299.
				</p>
				<div className="mt-10 space-x-3 mb-20 xl:mb-0">
					{/* 
						asChild prop tells the shadcnui button component that what we want to render is the Link. 
						We are doing navigation, not an "action", so we actually want an <a>Get started</a> tag to be what's in our HTML, 
						not a button.Without asChild, it would be nested in <button><a>Get started</a></button>. The button is not
						necessary and is just going to clutter things up and reduce accessibility to stuff like a screenreader.
					*/}
					<Button asChild>
						<Link href="/signup">Get started</Link>
					</Button>
					<Button asChild variant="secondary">
						<Link href="/login">Log in</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}
