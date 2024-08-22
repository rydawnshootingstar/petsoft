import PaymentButton from '@/components/PaymentButton';
import SectionHeader from '@/components/SectionHeader';

export default function Payment() {
	return (
		<main className="flex flex-col items-center justify-center">
			<SectionHeader>PetSoft access requires payment</SectionHeader>
			<PaymentButton />
		</main>
	);
}
