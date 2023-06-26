import React from "react";
import type { ReactElement } from "react";
import { ProfileLayout } from "@/layout";
import { TransactionsView } from "@/views";

const Transactions = (): ReactElement => {
	return (
		<ProfileLayout>
			<TransactionsView />
		</ProfileLayout>
	);
};

export default Transactions;
