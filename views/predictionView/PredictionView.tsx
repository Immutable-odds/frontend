import { PredictionCard } from "@/components/predictions";
import { predictionsList } from "@/mock";
import { Button, PredictionModal, Select, Title } from "@/shared";
import React, { useEffect, useState } from "react";
import styles from "./PredictionView.module.scss";

const filterOptions: { label: string; value: string }[] = [
	{
		label: "crypto",
		value: "crypto",
	},
	{
		label: "football",
		value: "football",
	},
];

enum PredictionFilter {
	CRYPTO = "crypto",
	FOOTBALL = "football",
}

const PredictionView = () => {
	const [showPredictionModal, setShowPredictionModal] = useState<boolean>(false);
	const [predictionFilter, setPredictionFilter] = useState<PredictionFilter>(
		PredictionFilter.CRYPTO
	);
	const [predictions, setPredictions] = useState<any>(predictionsList);
	useEffect(() => {
		const localPredictionList = predictionsList.filter(
			(prediction: any) => prediction.predictionType === predictionFilter
		);
		setPredictions(localPredictionList);
	}, [predictionFilter]);

	return (
		<section className={styles.section}>
			<div className={styles.row}>
				<Title title="Predictions" />
				<Button
					onClick={(e: any) => {
						setShowPredictionModal(true);
						e.stopPropagation();
					}}
					className={styles.button}
				>
					<p>Create Your Predictions</p>
					<span>+</span>
				</Button>
			</div>
			<div className={styles.margin_row}>
				<Select
					options={filterOptions}
					defaultOptionIndex={0}
					onOptionChange={setPredictionFilter}
				/>
			</div>
			<div className={styles.small_row}>
				{predictions.map((prediction: any, index: number) => (
					<PredictionCard prediction={prediction} key={index} />
				))}
			</div>
			{showPredictionModal && (
				<PredictionModal
					setOpenModal={setShowPredictionModal}
					openModal={showPredictionModal}
					predictions={predictions}
					addPrediction={setPredictions}
				/>
			)}
		</section>
	);
};

export default PredictionView;
