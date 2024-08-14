'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import PetForm from './PetForm';
import { useState } from 'react';
import { flushSync } from 'react-dom';

// TODO: onClick is currently only used for the checkout button. make a separate checkout button and remove this conditional prop
// NOTE: asChild prop goes into DialogTrigger to prevent

type PetButtonProps = {
	children?: React.ReactNode;
	className?: string;
	actionType: 'add' | 'edit' | 'checkout';
	onClick?: () => void;
	disabled?: boolean;
};
export default function PetButton({ children, className, actionType, onClick, disabled }: PetButtonProps) {
	const [formOpen, setFormOpen] = useState(false);

	if (actionType === 'add') {
		return (
			<Dialog open={formOpen} onOpenChange={setFormOpen}>
				<DialogTrigger asChild>
					<Button size="icon" className={cn('h-14 w-14', className)}>
						{children ? children : <PlusIcon className="h-6 w-6" />}
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add a new pet</DialogTitle>
						<DialogDescription>
							{"Add a new pet here. Click Add Pet when you're finished."}
						</DialogDescription>
					</DialogHeader>
					<PetForm
						actionType={actionType}
						onFormSubmission={() => {
							flushSync(() => {
								setFormOpen(false);
							});
						}}
					/>
				</DialogContent>
			</Dialog>
		);
	} else if (actionType === 'edit') {
		return (
			<Dialog open={formOpen} onOpenChange={setFormOpen}>
				<DialogTrigger asChild>
					<Button variant="secondary" className={cn('', className)}>
						{children ? children : 'Edit'}
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit pet</DialogTitle>
						<DialogDescription>
							{"Edit one of your pets here. Click Edit Pet when you're finished."}
						</DialogDescription>
					</DialogHeader>
					<PetForm
						actionType={actionType}
						onFormSubmission={() => {
							flushSync(() => {
								setFormOpen(false);
							});
						}}
					/>
				</DialogContent>
			</Dialog>
		);
	} else if (actionType === 'checkout') {
		return (
			<Button disabled={disabled} onClick={onClick} variant="secondary" className={cn('', className)}>
				{children ? children : 'Checkout'}
			</Button>
		);
	}

	return <Button className={cn('', className)}>{children && children}</Button>;
}
