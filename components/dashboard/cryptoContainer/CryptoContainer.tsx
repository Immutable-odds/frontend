import { OddsCard } from "@/shared";
import { CryptoBet } from "@/types";
import Image from "next/legacy/image";
import React from "react";
import styles from "./CryptoContainer.module.scss";

interface Props {
	cryptoBets: CryptoBet[];
}

const CryptoContainer = ({ cryptoBets }: Props) => {
	return (
		<div className={styles.container}>
			{cryptoBets.map((bet: CryptoBet, index: number) => (
				<Card bet={bet} key={index} />
			))}
		</div>
	);
};

export default CryptoContainer;

interface CardProps {
	bet: CryptoBet;
}

const Card = ({ bet }: CardProps) => {
	const localTime = new Date(bet.timeStamp * 1000).toLocaleString(undefined, {
		timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	});
	const [date, time] = localTime.split(", ");
	const formattedTime = time.slice(0, -3);

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<div className={styles.card_row}>
					<div className={styles.text}>
						<p>
							{date}, {formattedTime}{" "}
						</p>
					</div>
					<div className={styles.text}>
						<h5>Bet Condition</h5>
					</div>
					<div className={styles.title_container}>
						<div className={styles.title}>
							<div className={styles.text}>
								<h5>I Agree</h5>
							</div>
						</div>
						<div className={styles.title}>
							<div className={styles.text}>
								<h5>I Don&apos;t</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.small_row}>
					<div className={styles.icon_container}>
						<div className={styles.icon}>
							<Image src={bet.icon1} layout="fill" alt="" />
						</div>
						{bet.icon2 && (
							<div className={styles.icon}>
								<Image src={bet.icon2} layout="fill" alt="" />
							</div>
						)}
					</div>
					<div className={styles.text}>
						<p>
							{bet.token1}
							{bet.token2 && `/${bet.token2}`}
						</p>
					</div>
				</div>
				<div className={styles.text}>
					<span>{bet.betCondition}</span>
				</div>
				<OddsCard
					winOdds={2.45}
					drawOdds={3.45}
					lossOdds={4.45}
					data={bet}
					type="crypto"
				/>
			</div>
		</div>
	);
};
