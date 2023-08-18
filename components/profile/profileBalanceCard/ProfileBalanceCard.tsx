import { ProgressBar } from "@/shared";
import { formatNum } from "@/utils";
import Image from "next/legacy/image";
import React from "react";
import styles from "./ProfileBalanceCard.module.scss";

interface Props {
	points: number;
	balance: number;
}

const ProfileBalanceCard = ({ points, balance }: Props) => {
	return (
		<div className={styles.card}>
			<div className={styles.text}>
				<h3>Finance & Balance</h3>
			</div>
			<div className={styles.small_card}>
				<Image src="/svgs/background-points.svg" layout="fill" alt="" />
				<div className={styles.small_card_container}>
					<div className={styles.small_card_row}>
						<div className={styles.icon}>
							<Image src="/svgs/icon-points.svg" layout="fill" alt="" />
						</div>
						<div className={styles.block}>
							<div className={styles.text}>
								<p>Points: {formatNum(points)}</p>
							</div>
							<ProgressBar
								percent={80}
								height={4}
								className={styles.progress}
							/>
							<div className={styles.text}>
								<h6>
									<span>Current:</span> Bronze
								</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.small_card}>
				<Image src="/svgs/background-balance.svg" layout="fill" alt="" />
				<div className={styles.small_card_container}>
					<div className={styles.small_card_row}>
						<div className={styles.icon}>
							<Image src="/svgs/icon-wallet.svg" layout="fill" alt="" />
						</div>
						<div className={styles.text}>
							<p>Wallet Balance</p>
							<h1>${formatNum(balance)}</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileBalanceCard;
