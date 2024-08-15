// NOTE: normal mode
// import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

/*
		This component was broken into its own file to work with useFormStatus (it must be a child of a <form></form> to use this)
		but is now not using any loading state because we changed it to use an optimistic pattern
*/

type PetFormButtonProps = {
	actionType: 'add' | 'edit' | 'checkout';
};

export default function PetFormButton({ actionType }: PetFormButtonProps) {
	// NOTE: normal mode
	// const { pending } = useFormStatus();
	// disabled={pending}
	return (
		<Button type="submit" className="mt-5 self-end">
			{actionType === 'add' ? 'Add' : 'Edit'} Pet
		</Button>
	);
}
