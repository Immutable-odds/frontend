import React from "react";
import type { ReactElement } from "react";
import { MainLayout } from "@/layout";

const Predictions = (): ReactElement => {
	return (
		<MainLayout page="/trends">
			<div
				style={{
					display: "grid",
					placeItems: "center",
					padding: "33vh 0 0",
					fontSize: "50px",
					fontWeight: "600",
					color: "#17171A",
					letterSpacing: "0.5rem",
					WebkitTextStroke: "4px",
					textShadow:
						"0px 0px 28.0337px #fff, 0px 0px 7.00843px #fff, 0px 0px 14.0169px #fff",
				}}
			>
				Predictions
			</div>
		</MainLayout>
	);
};

export default Predictions;
