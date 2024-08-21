'use client';

import { usePetContext } from '@/lib/hooks';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import PetFormButton from './PetFormButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DEFAULT_PET_IMAGE } from '@/lib/constants';
import { petFormSchema, TPetForm } from '@/lib/zodSchemas';
// NOTE: regular mode 1
// import { useFormState } from 'react-dom';

/*
	useFormState was implemented to add loading states. We aren't using those anymore since changing to the 
	optimistic ui. 
*/

type PetFormProps = {
	actionType: 'add' | 'edit' | 'checkout';
	onFormSubmission: () => void;
};

export default function PetForm({ actionType, onFormSubmission }: PetFormProps) {
	const { activePet, handleAddPet, handleEditPet } = usePetContext();

	const {
		register,
		trigger,
		getValues,
		// NOTE: regular mode 2
		formState: { /* isSubmitting, */ errors },
	} = useForm<TPetForm>({
		resolver: zodResolver(petFormSchema),
		defaultValues:
			actionType === 'edit'
				? {
						name: activePet?.name,
						ownerName: activePet?.ownerName,
						imageUrl: activePet?.imageUrl,
						age: activePet?.age,
						notes: activePet?.notes,
				  }
				: undefined,
	});

	// Progressive Enhancement method that doesn't need JS at all, we use the action={addPet}
	//const [error, formAction] = useFormState(addPet, {});

	// manual method using onSubmit instead of action
	// const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();

	// 	// our form is uncontrolled so we're using this method instead of setting up state for each field
	// 	const formData = new FormData(e.currentTarget);

	// 	// overriding typescript's default inferrences because it doesn't realize that the inputs were marked as "required" and therefore can't
	// 	// come in as null
	// 	const pet = {
	// 		name: formData.get('name') as string,
	// 		ownerName: formData.get('ownerName') as string,
	// 		imageUrl:
	// 			(formData.get('imageUrl') as string) ||
	// 			DEFAULT_PET_IMAGE,
	// 		age: +(formData.get('age') as string),
	// 		notes: formData.get('notes') as string,
	// 	};

	// 	if (actionType === 'add') {
	// 		handleAddPet(pet);
	// 	} else if (actionType === 'edit') {
	// 		handleEditPet(activePet!.id, pet); // ! tells typescript it will always exist, even though it thinks it's possible it couldn't
	// 	}

	// 	onFormSubmission();

	// 	//console.log(pet);
	// };

	return (
		<form
			action={async (formData) => {
				// close dialog immediately (optimistic implementation)

				const result = await trigger();
				if (!result) {
					return;
				}
				// NOTE: optimistic mode
				onFormSubmission();

				// automatically convert formData to a valid JS object
				const petData = getValues();
				// replace blank entry with default/placeholder image
				petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE;

				if (actionType === 'add') {
					await handleAddPet(petData);
				} else if (actionType === 'edit') {
					await handleEditPet(activePet!.id, petData); // we will always have an activePet so force this
				}
				// close dialog after (non optimistic implementation)
				// NOTE: regular mode
				// onFormSubmission();
			}}
			className="flex flex-col"
		>
			<div className="space-y-3">
				<div className="space-y-1">
					<Label htmlFor="name">Name</Label>
					<Input id="name" {...register('name')}></Input>
					{errors.name && <p className="text-red-500">{errors.name.message}</p>}
				</div>
				<div className="space-y-1">
					<Label htmlFor="ownerName">Owner Name</Label>
					<Input id="ownerName" {...register('ownerName')}></Input>
					{errors.ownerName && <p className="text-red-500">{errors.ownerName.message}</p>}
				</div>
				<div className="space-y-1">
					<Label htmlFor="age">Age</Label>
					<Input id="age" type="number" {...register('age')}></Input>
					{errors.age && <p className="text-red-500">{errors.age.message}</p>}
				</div>
				<div className="space-y-1">
					<Label htmlFor="imageURL">Image URL</Label>
					<Input id="imageUrl" {...register('imageUrl')}></Input>
					{errors.imageUrl && <p className="text-red-500">{errors.imageUrl.message}</p>}
				</div>
				<div className="space-y-1">
					<Label htmlFor="notes">Notes</Label>
					<Textarea id="notes" {...register('notes')}></Textarea>
					{errors.notes && <p className="text-red-500">{errors.notes.message}</p>}
				</div>
			</div>
			<PetFormButton actionType={actionType} />
		</form>
	);
}
