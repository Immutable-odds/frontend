import { DashboardLayout } from "@/layout";
import { DashboardCryptoView } from "@/views";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
	return (
		<DashboardLayout>
			<DashboardCryptoView />
		</DashboardLayout>
	);
}
