import type { ReactElement } from "react";
import { DashboardLayout, MainLayout } from "@/layout";
import { LeaguePage } from "@/views";

const League = (): ReactElement => {
	return (
		<DashboardLayout>
			<LeaguePage />
		</DashboardLayout>
	);
};

export default League;
