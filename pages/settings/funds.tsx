import React from "react";
import type { ReactElement } from "react";
import { ProfileLayout } from "@/layout";
import { FundsView } from "@/views";

const Funds = (): ReactElement => {
	return (
		<ProfileLayout>
			<FundsView />
		</ProfileLayout>
	);
};

export default Funds;
