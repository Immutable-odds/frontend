import { tokens } from "@/mock";
import Button from "@/shared/button/Button";
import InputField from "@/shared/inputField/InputField";
import AdvanceSelect from "@/shared/selects/advancedSelect/AdvancedSelect";
import Select from "@/shared/selects/select/Select";
import { SelectOption } from "@/types";
import React, { useEffect, useState } from "react";
import styles from "./PredictionModal.module.scss";

interface Props {
	setOpenModal: (e?: any) => void;
	openModal: boolean;
	addPrediction: (e?: any) => void;
	predictions: any[];
}
interface Prediction {
	condition: string;
	item1: string;
	item2: string;
	percentage: number;
	price: number;
	timeLine: number;
}

const conditions: SelectOption[] = [
	{ label: "percentage", value: "Token would rise above a set percentage" },
	{ label: "price", value: "Token would rise above a set price" },
	{ label: "2 tokens", value: "Token A would be greater than Token B" },
	{ label: "percentage", value: "Token would drop below a set percentage" },
	{ label: "price", value: "Token would drop below a set price" },
	{ label: "2 tokens", value: "Token A would be less than Token B" },
];

enum View {
	CRYPTO = "CRYPTO",
	FOOTBALL = "FOOTBALL",
}

const PredictionModal = ({
	setOpenModal,
	openModal,
	addPrediction,
	predictions,
}: Props) => {
	const [view, setView] = useState<View>(View.CRYPTO);
	const [conditionType, setConditionType] = useState<string>("");
	const [condition, setCondition] = useState<string>("");
	const [prediction, setPrediction] = useState<Prediction>({
		condition: "",
		item1: "",
		item2: "",
		percentage: 0,
		price: 0,
		timeLine: 20,
	});
	const handleDisable = () => {
		if (conditionType === "percentage") {
			if (prediction.percentage && prediction.item1) return false;
			return true;
		}
		if (conditionType === "price") {
			if (prediction.price && prediction.item1) return false;
			return true;
		}
		if (conditionType === "2 tokens") {
			if (prediction.item1 && prediction.item2) return false;
			return true;
		}
	};
	useEffect(() => {
		let localCondition;
		if (prediction.condition === "Token would rise above a set percentage") {
			localCondition = `${prediction.item1} would rise above ${prediction.percentage}%`;
			setCondition(localCondition);
			return;
		}
		if (prediction.condition === "Token would rise above a set price") {
			localCondition = `${prediction.item1} would rise above $${prediction.price}`;
			setCondition(localCondition);
			return;
		}
		if (prediction.condition === "Token A would be greater than Token B") {
			localCondition = `${prediction.item1} would be greater than ${prediction.item2}`;
			setCondition(localCondition);
			return;
		}
		if (prediction.condition === "Token would drop below a set percentage") {
			localCondition = `${prediction.item1} would drop above ${prediction.percentage}%`;
			setCondition(localCondition);
			return;
		}
		if (prediction.condition === "Token would drop below a set price") {
			localCondition = `${prediction.item1} would drop below $${prediction.price}`;
			setCondition(localCondition);
			return;
		}
		if (prediction.condition === "Token A would be less than Token B") {
			localCondition = `${prediction.item1} would be less than ${prediction.item2}`;
			setCondition(localCondition);
			return;
		}
	}, [prediction]);
	useEffect(() => {
		const handleClickOutside = () => {
			setOpenModal(false);
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [setOpenModal]);
	const handleConditionSelect = (option: any) => {
		const conditionFilter = conditions.filter(
			(condition: SelectOption) => option.condition === condition.value
		);
		setPrediction((prediction: Prediction) => ({
			...prediction,
			condition: option.condition,
		}));
		setConditionType(conditionFilter[0].label);
	};
	const handleitem1Select = (option: any) => {
		setPrediction((prediction: Prediction) => ({
			...prediction,
			item1: option.item1,
		}));
	};
	const handleitem2Select = (option: any) => {
		setPrediction((prediction: Prediction) => ({
			...prediction,
			item2: option.item2,
		}));
	};
	const handleSubmit = () => {
		const newPrediction = predictions;
		const formattedPrediction = {
			item1: prediction.item1,
			item2: prediction.item2,
			prediction: condition,
			icon1: `/svgs/tokens/${prediction.item1.toLowerCase()}.svg`,
			icon2: prediction.item2
				? `/svgs/tokens/${prediction.item2.toLowerCase()}.svg`
				: "",
			status: "ongoing",
			percentageChange: 12.5,
			poolSize: 0,
			predictonType: view === View.CRYPTO ? "crypto" : "football",
			timeStamp: 1687859200,
		};
		newPrediction.unshift(formattedPrediction);
		addPrediction(newPrediction);
		setOpenModal(false);
	};

	return (
		<div className={styles.modal} data-active={openModal}>
			<div className={styles.container} onClick={(e: any) => e.stopPropagation()}>
				<div
					className={styles.closeModal_container}
					onClick={() => setOpenModal(false)}
				>
					<div className={styles.closeModal}>
						<span></span>
						<span></span>
					</div>
				</div>
				<div className={styles.body_container}>
					<div className={styles.text}>
						<h3>Create Predictions</h3>
						<p>
							Select the conditions you want to predict and make your bets
						</p>
					</div>
					<div className={styles.button_block}>
						<Button
							buttonType="transparent"
							className={styles.button_container}
							onClick={() => {
								setView(View.CRYPTO);
							}}
						>
							<div
								className={styles.tab_button}
								data-active={view === View.CRYPTO}
							>
								Crypto
							</div>
						</Button>
						<Button
							buttonType="transparent"
							className={styles.button_container}
							onClick={() => {
								setView(View.FOOTBALL);
							}}
						>
							<div
								className={styles.tab_button}
								data-active={view === View.FOOTBALL}
							>
								Football
							</div>
						</Button>
					</div>
					{view === View.CRYPTO && (
						<div className={styles.body}>
							<div className={styles.block}>
								<div className={styles.text}>
									<h6>Condition</h6>
								</div>
								<AdvanceSelect
									options={conditions}
									className={styles.select}
									onOptionChange={handleConditionSelect}
									defaultOption="Select a condition"
									objectOption="condition"
									object={prediction}
								/>
							</div>
							{prediction.condition && (
								<div className={styles.block}>
									<div className={styles.text}>
										<h6>
											Token{" "}
											{conditionType === "2 tokens" ? "A" : ""}
										</h6>
									</div>
									<AdvanceSelect
										options={tokens}
										className={styles.select}
										onOptionChange={handleitem1Select}
										objectOption="item1"
										object={prediction}
										defaultOption="Select token"
										valueType="label"
									/>
								</div>
							)}
							{conditionType === "2 tokens" && (
								<div className={styles.block}>
									<div className={styles.text}>
										<h6>Token B</h6>
									</div>
									<AdvanceSelect
										options={tokens}
										className={styles.select}
										onOptionChange={handleitem2Select}
										objectOption="item2"
										object={prediction}
										defaultOption="Select token"
										valueType="label"
									/>
								</div>
							)}
							{conditionType === "percentage" && (
								<div className={styles.block}>
									<InputField
										label="Percentage Rise"
										suffix="%"
										value={prediction.percentage}
										onChange={(e: any) =>
											setPrediction({
												...prediction,
												percentage: e.target.value,
											})
										}
									/>
								</div>
							)}
							{conditionType === "price" && (
								<div className={styles.block}>
									<InputField
										label="Price"
										value={prediction.price}
										onChange={(e: any) =>
											setPrediction({
												...prediction,
												price: e.target.value,
											})
										}
									/>
								</div>
							)}
							{prediction.condition && (
								<div className={styles.block}>
									<div className={styles.text}>
										<h6>Prediction Timeline</h6>
									</div>
									<div className={styles.row}>
										<InputField
											value={prediction.timeLine}
											onChange={(e: any) =>
												setPrediction({
													...prediction,
													timeLine: e.target.value,
												})
											}
										/>
										<Select
											options={[
												{ label: "min", value: "minute" },
												{ label: "hr", value: "hour" },
												{ label: "d", value: "day" },
											]}
											defaultOptionIndex={0}
											className={styles.small_select}
										/>
									</div>
								</div>
							)}
							{prediction.condition && (
								<Button
									className={styles.button}
									disabled={handleDisable()}
									onClick={handleSubmit}
								>
									Create Prediction
								</Button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PredictionModal;
