import LogoutButton from '@/components/LogoutButton';
import PaymentButton from '@/components/PaymentButton';
import SectionHeader from '@/components/SectionHeader';
import StartUsingPetSoftButton from '@/components/StartUsingPetSoftButton';

export default function Payment({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	return (
		<main className="flex flex-col items-center justify-center">
			{!searchParams.success && (
				<>
					<SectionHeader>PetSoft access requires payment</SectionHeader>
					<p className="text-lg bold mt-5">One-time payment of $299. No additional fees or subscriptions.</p>
					<PaymentButton />
					<div className="flex flex-col items-center absolute bottom-0 space-y-2 mb-5">
						<p className="">Not ready to start using PetSoft yet?</p>

						<LogoutButton />
					</div>
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
				<>
					<SectionHeader className="text-red-700 text-md mt-3 mb-4">
						Payment cancelled. You can try again.
					</SectionHeader>
				</>
			)}
		</main>
	);
}
