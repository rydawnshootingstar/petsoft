'use client';

import { usePetContext } from '@/lib/hooks';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

type PetFormProps = {
	actionType: 'add' | 'edit' | 'checkout';
	onFormSubmission: () => void;
};

export default function PetForm({ actionType, onFormSubmission }: PetFormProps) {
	const { activePet, handleAddPet, handleEditPet } = usePetContext();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// our form is uncontrolled so we're using this method instead of setting up state for each field
		const formData = new FormData(e.currentTarget);

		// overriding typescript's default inferrences because it doesn't realize that the inputs were marked as "required" and therefore can't
		// come in as null
		const pet = {
			name: formData.get('name') as string,
			ownerName: formData.get('ownerName') as string,
			imageUrl:
				(formData.get('imageUrl') as string) ||
				'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
			age: +(formData.get('age') as string),
			notes: formData.get('notes') as string,
		};

		if (actionType === 'add') {
			handleAddPet(pet);
		} else if (actionType === 'edit') {
			handleEditPet(activePet!.id, pet); // ! tells typescript it will always exist, even though it thinks it's possible it couldn't
		}

		onFormSubmission();

		//console.log(pet);
	};
	return (
		<form onSubmit={handleSubmit} className="flex flex-col">
			<div className="space-y-3">
				<div className="space-y-1">
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						type="text"
						name={'name'}
						required
						defaultValue={actionType === 'edit' && activePet?.name ? activePet.name : ''}
					></Input>
				</div>
				<div className="space-y-1">
					<Label htmlFor="ownerName">Owner Name</Label>
					<Input
						id="ownerName"
						type="text"
						name={'ownerName'}
						required
						defaultValue={actionType === 'edit' && activePet?.ownerName ? activePet.ownerName : ''}
					></Input>
				</div>
				<div className="space-y-1">
					<Label htmlFor="age">Age</Label>
					<Input
						id="age"
						type="number"
						name={'age'}
						required
						defaultValue={actionType === 'edit' && activePet?.age ? activePet.age : ''}
					></Input>
				</div>
				<div className="space-y-1">
					<Label htmlFor="imageURL">Image URL</Label>
					<Input
						id="imageUrl"
						type="text"
						name={'imageUrl'}
						defaultValue={actionType === 'edit' && activePet?.imageUrl ? activePet.imageUrl : ''}
					></Input>
				</div>
				<div className="space-y-1">
					<Label htmlFor="notes">Notes</Label>
					<Textarea
						id="notes"
						rows={3}
						name={'notes'}
						required
						defaultValue={actionType === 'edit' && activePet?.notes ? activePet.notes : ''}
					></Textarea>
				</div>
			</div>

			<Button type="submit" className="mt-5 self-end">
				{actionType === 'add' ? 'Add' : 'Edit'} Pet
			</Button>
		</form>
	);
}
