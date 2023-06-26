import { formatNum } from "@/utils";
import Image from "next/legacy/image";
import React from "react";
import styles from "./StatCard.module.scss";

interface Props {
	stats: {
		bets: number;
		amountWon: number;
		pointsWon: number;
	};
}

const StatCard = ({ stats }: Props) => {
	return (
		<div className={styles.card}>
			<div className={styles.text}>
				<h3>Stats</h3>
			</div>
			<div className={styles.row}>
				<div className={styles.icon}>
					<Image src="/svgs/icon-bets.svg" layout="fill" alt="" />
				</div>
				<div className={styles.text}>
					<h6>Bets Made</h6>
					<p>{formatNum(stats.bets)}</p>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.icon}>
					<Image src="/svgs/icon-amount-won.svg" layout="fill" alt="" />
				</div>
				<div className={styles.text}>
					<h6>Total Amount Won</h6>
					<p>${formatNum(stats.amountWon)}</p>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.icon}>
					<Image src="/svgs/icon-points-won.svg" layout="fill" alt="" />
				</div>
				<div className={styles.text}>
					<h6>Points Won</h6>
					<p>{formatNum(stats.pointsWon)}</p>
				</div>
			</div>
		</div>
	);
};

export default StatCard;
