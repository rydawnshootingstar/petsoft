import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

// TODO: onClick is currently only used for the checkout button. make a separate checkout button and remove this conditional prop

type PetButtonProps = {
	children?: React.ReactNode;
	className?: string;
	actionType: 'add' | 'edit' | 'checkout';
	onClick?: () => void;
};
export default function PetButton({ children, className, actionType, onClick }: PetButtonProps) {
	if (actionType === 'add') {
		return (
			<Button size="icon" className={cn('h-14 w-14', className)}>
				{children ? children : <PlusIcon className="h-6 w-6" />}
			</Button>
		);
	} else if (actionType === 'edit') {
		return (
			<Button variant="secondary" className={cn('', className)}>
				{children ? children : 'Edit'}
			</Button>
		);
	} else if (actionType === 'checkout') {
		return (
			<Button onClick={onClick} variant="secondary" className={cn('', className)}>
				{children ? children : 'Checkout'}
			</Button>
		);
	}

	return <Button className={cn('', className)}>{children && children}</Button>;
}
