import { cn } from '@/lib/utils';

type SectionHeaderProps = {
	children: React.ReactNode;
	className?: string;
};

export default function SectionHeader({ children, className }: SectionHeaderProps) {
	return (
		<h1 className={cn('font-medium text-2xl leading-6', className)}>
			<span className="font-semibold">{children}</span>
		</h1>
	);
}
