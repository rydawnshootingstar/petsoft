import PaymentButton from '@/components/PaymentButton';
import SectionHeader from '@/components/SectionHeader';
import StartUsingPetSoftButton from '@/components/StartUsingPetSoftButton';

export default function Payment({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	return (
		<main className="flex flex-col items-center justify-center">
			{!searchParams.success && (
				<>
					<SectionHeader>PetSoft access requires payment</SectionHeader>
					<PaymentButton />
				</>
			)}
			{searchParams.success && (
				<>
					<SectionHeader className="text-green-700 mt-5">
						Payment successful! You now have lifetime access to PetSoft.
					</SectionHeader>
					<StartUsingPetSoftButton />
				</>
			)}
			{searchParams.cancelled && (
				<SectionHeader className="text-red-700 mt-5">Payment cancelled. You can try again.</SectionHeader>
			)}
		</main>
	);
}
