export default function BackgroundPattern() {
	// passing an arbitrary hsl code to tailwind oly works if you add color: AND remove the spaces between commas. wow.
	return <div className={'bg-[color:hsl(204,8%,70%);] h-[300px] w-full absolute top-0 -z-10'} />;
}
