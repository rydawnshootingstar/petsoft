import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger, DialogHeader } from './ui/dialog';
import PetForm from './PetForm';

// TODO: onClick is currently only used for the checkout button. make a separate checkout button and remove this conditional prop
// NOTE: asChild prop goes into DialogTrigger to prevent

type PetButtonProps = {
	children?: React.ReactNode;
	className?: string;
	actionType: 'add' | 'edit' | 'checkout';
	onClick?: () => void;
};
export default function PetButton({ children, className, actionType, onClick }: PetButtonProps) {
	if (actionType === 'add') {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<Button size="icon" className={cn('h-14 w-14', className)}>
						{children ? children : <PlusIcon className="h-6 w-6" />}
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>Add a new pet</DialogHeader>
					<PetForm />
				</DialogContent>
			</Dialog>
		);
	} else if (actionType === 'edit') {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="secondary" className={cn('', className)}>
						{children ? children : 'Edit'}
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>Edit pet</DialogHeader>
					<PetForm />
				</DialogContent>
			</Dialog>
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
