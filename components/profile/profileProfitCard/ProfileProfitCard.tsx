import { Select } from "@/shared";
import { LineChart } from "@/shared/charts";
import { formatNum } from "@/utils";
import Image from "next/image";
import React from "react";
import styles from "./ProfileProfitCard.module.scss";

interface Props {
	chartData: { day: string; value: number }[];
	earnings: number;
	points: number;
}

const ProfileProfitCard = ({ chartData, earnings, points }: Props) => {
	return (
		<div className={styles.card}>
			<div className={styles.row}>
				<div className={styles.text}>
					<h3>Profit Activity</h3>
				</div>
				<Select
					options={[{ label: "week", value: "This Week" }]}
					defaultOptionIndex={0}
				/>
			</div>
			<div className={styles.small_card_container}>
				<div className={styles.small_card}>
					<div className={styles.small_card_row}>
						<div className={styles.icon}>
							<Image
								src="/svgs/icon-wallet.svg"
								fill
								sizes="100vw"
								alt=""
							/>
						</div>
						<div className={styles.text}>
							<p>
								<span>Earnings:</span> ${formatNum(earnings)}
							</p>
						</div>
					</div>
				</div>
				<div className={styles.small_card}>
					<div className={styles.small_card_row}>
						<div className={styles.icon}>
							<Image
								src="/svgs/icon-points.svg"
								fill
								sizes="100vw"
								alt=""
							/>
						</div>
						<div className={styles.text}>
							<p>
								<span>Points:</span> {formatNum(points)}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.chart}>
				<LineChart data={chartData} xDataKey="day" yOrientation="left" />
			</div>
		</div>
	);
};

export default ProfileProfitCard;
