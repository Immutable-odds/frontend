import React from "react";
import type { ReactElement } from "react";
import { MainLayout } from "@/layout";
import { PredictionView } from "@/views";

const Predictions = (): ReactElement => {
	return (
		<MainLayout>
			<PredictionView />
		</MainLayout>
	);
};

export default Predictions;
