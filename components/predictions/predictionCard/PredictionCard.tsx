import { useGlobalContext } from "@/contexts/AppContext";
import { Button, Countdown, DetailContainer, InputField, Select } from "@/shared";
import { formatNum } from "@/utils";
import Image from "next/legacy/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./PredictionCard.module.scss";

interface CardProps {
	prediction: any;
}

enum View {
	DEFAULT = "DEFAULT",
	STAKE = "STAKE",
}
const PredictionCard = ({ prediction }: CardProps) => {
	const { walletBalance }: any = useGlobalContext();
	const [view, setView] = useState<View>(View.DEFAULT);
	const [stakeDetails, setStakeDetails] = useState<{
		stakeAmount: number | string;
		stakePrediction: string;
	}>({
		stakeAmount: "",
		stakePrediction: "",
	});
	const handlePrediction = (prediction: string) => {
		setStakeDetails({
			...stakeDetails,
			stakePrediction: prediction,
		});
		setView(View.STAKE);
	};
	const handleStake = () => {
		if (!stakeDetails.stakeAmount) {
			toast.error("Please add an amount");
			return;
		}
		setView(View.DEFAULT);
	};
	const editStakeAmount = () => {
		setView(View.STAKE);
		setStakeDetails({ ...stakeDetails, stakeAmount: "" });
	};
	const resultType = prediction.result
		? prediction.result.includes("Yes")
			? "yes"
			: "no"
		: "";
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.icon_block}>
					<div className={styles.icon_container}>
						<div className={styles.icon}>
							<Image src={prediction.icon1} layout="fill" alt="" />
						</div>
						{prediction.icon2 && (
							<div className={styles.icon}>
								<Image src={prediction.icon2} layout="fill" alt="" />
							</div>
						)}
					</div>
				</div>
				{stakeDetails.stakeAmount && stakeDetails.stakePrediction && (
					<div className={styles.options_block}>
						<div className={styles.more_icon}>
							<Image src="/svgs/dots-horizontal.svg" layout="fill" alt="" />
							<div
								className={styles.more_details}
								onClick={() =>
									setStakeDetails({
										stakeAmount: "",
										stakePrediction: "",
									})
								}
							>
								<div className={styles.text}>
									<p>Cancel Prediction</p>
								</div>
							</div>
						</div>
					</div>
				)}
				{view === View.DEFAULT && (
					<>
						<div className={styles.block}>
							<div className={styles.text}>
								<h3>
									Predit if &quot;
									{/* {prediction.item1.toUpperCase()}
									{prediction.item2 &&
										`/${prediction.item2.toUpperCase()}`}{" "}
									{prediction.item2 && `Pair `} */}
									{prediction.prediction}
									&quot;
								</h3>
							</div>
						</div>
						<DetailContainer
							title="Pool Size"
							description="kdlsj"
							value={prediction.poolSize + Number(stakeDetails.stakeAmount)}
							prefix="$"
							className={styles.details_container}
						/>
						{prediction.status !== "finished" &&
							prediction.predictionType === "crypto" && (
								<DetailContainer
									title={`Last ${prediction.item1.toUpperCase()}${
										prediction.item2
											? `/${prediction.item2.toUpperCase()}`
											: ""
									} % change`}
									value={prediction.percentageChange}
									prefix={prediction.percentageChange > 0 ? "+" : ""}
									className={styles.details_container}
									suffix="%"
									textType={
										prediction.percentageChange > 0 ? "gain" : "loss"
									}
								/>
							)}
						{prediction.status !== "finished" &&
							prediction.predictionType === "football" && (
								<DetailContainer
									title={`Last Winner between both teams`}
									value={prediction.head2Head}
									className={styles.details_container}
								/>
							)}
						{stakeDetails.stakeAmount && (
							<>
								<DetailContainer
									title="My Prediction"
									value={stakeDetails.stakePrediction}
								/>
								<div className={styles.small_row}>
									<DetailContainer
										title="Stake Amount"
										value={stakeDetails.stakeAmount}
										prefix="$"
									/>
									<div
										className={styles.edit_icon}
										onClick={editStakeAmount}
									>
										<Image
											src="/svgs/edit.svg"
											layout="fill"
											alt=""
										/>
									</div>
								</div>
							</>
						)}
						{prediction.status === "finished" && (
							<>
								<DetailContainer
									title="Total Stakers"
									value={formatNum(
										prediction.voters.yes + prediction.voters.no
									)}
								/>
								<DetailContainer
									title="People for No it won’t"
									value={formatNum(prediction.voters.no)}
								/>
								<DetailContainer
									title="People for Yes it would"
									value={formatNum(prediction.voters.yes)}
								/>
							</>
						)}
						{prediction.status !== "finished"
							? !stakeDetails.stakeAmount && (
									<div className={styles.button_container}>
										<Button
											buttonType="transparent"
											className={styles.button}
											onClick={() =>
												handlePrediction("No it won't")
											}
										>
											No it won&apos;t
										</Button>
										<Button
											buttonType="transparent"
											className={styles.button}
											onClick={() =>
												handlePrediction("Yes it will")
											}
										>
											Yes it will
										</Button>
									</div>
							  )
							: ""}

						<div
							className={styles.time_container}
							data-type={prediction.status}
							data-value={resultType}
						>
							<div className={styles.text}>
								<h3>
									{prediction.status === "upcoming"
										? "Starts in"
										: prediction.status === "ongoing"
										? "Ends in"
										: "Ended"}
									:{" "}
									{prediction.status === "finished" ? (
										prediction.result
									) : (
										<Countdown epochTime={prediction.timeStamp} />
									)}
								</h3>
							</div>
						</div>
					</>
				)}
				{view === View.STAKE && (
					<>
						<div
							className={styles.back_button}
							onClick={() => setView(View.DEFAULT)}
						>
							<div className={styles.back_icon}>
								<Image src="/svgs/arrow.svg" layout="fill" alt="" />
							</div>
							<div className={styles.text}>
								<p>Back</p>
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.text}>
								<p>Stake Amount</p>
							</div>
							<InputField
								className={styles.input}
								placeholder="Enter Amount"
								value={stakeDetails.stakeAmount}
								onChange={(e: any) =>
									setStakeDetails({
										...stakeDetails,
										stakeAmount: e.target.value,
									})
								}
							/>
						</div>
						<div className={styles.row}>
							<div className={styles.text}>
								<p>Pay With:</p>
							</div>
							<div className={styles.select_container}>
								<Select
									options={[{ label: "wallet", value: "wallet" }]}
									className={styles.select}
								/>
							</div>
						</div>
						<div className={styles.block}>
							<DetailContainer
								title="Wallet Balance"
								value={walletBalance}
								prefix="$"
							/>
							<DetailContainer title="Points" value={10000000} />
						</div>
						<Button className={styles.long_button} onClick={handleStake}>
							Place Stake
						</Button>
					</>
				)}
			</div>
		</div>
	);
};

export default PredictionCard;
