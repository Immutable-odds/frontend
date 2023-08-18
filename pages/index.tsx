import { DashboardLayout } from "@/layout";
import { DashboardCryptoView } from "@/views";

export default function Home() {
	return (
		<DashboardLayout>
			<DashboardCryptoView />
		</DashboardLayout>
	);
}
