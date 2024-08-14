import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

type PetFormButtonProps = {
	actionType: 'add' | 'edit';
};

export default function PetFormButton({ actionType }: PetFormButtonProps) {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" disabled={pending} className="mt-5 self-end">
			{actionType === 'add' ? 'Add' : 'Edit'} Pet
		</Button>
	);
}
