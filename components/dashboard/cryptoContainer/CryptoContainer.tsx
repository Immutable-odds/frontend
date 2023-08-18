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
			{cryptoBets.map((bet: any, index: number) => (
				<Card bet={bet} key={`${bet?.poolData?.id}-${index}`} />
			))}
		</div>
	);
};

export default CryptoContainer;

interface CardProps {
	bet: any;
}

const Card = ({ bet }: CardProps) => {
	const localTime = new Date(bet.timestamp).toLocaleString(undefined, {
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
							<Image src={bet?.token1?.icon} layout="fill" alt="" />
						</div>
						{bet?.token2?.icon && (
							<div className={styles.icon}>
								<Image src={bet?.token2?.icon} layout="fill" alt="" />
							</div>
						)}
					</div>
					<div className={styles.text}>
						<p>
							{bet?.token1?.symbol}
							{bet?.token2?.symbol && `/${bet?.token2.symbol}`}
						</p>
					</div>
				</div>
				<div className={styles.text}>
					<span>{bet.betCondition}</span>
				</div>
				<OddsCard
					winOdds={bet?.apy?.agree}
					drawOdds={100 - (+bet?.apy?.agree + +bet?.apy?.disagree)}
					lossOdds={bet?.apy?.disagree}
					data={bet}
					type={bet?.betType}
				/>
			</div>
			<div className={styles.mob_header}>
				<div className={styles.small_row}>
					<div className={styles.icon_container}>
						<div className={styles.icon}>
							<Image src={bet?.token1?.icon1} layout="fill" alt="" />
						</div>
						{bet?.token2?.icon && (
							<div className={styles.icon}>
								<Image src={bet?.token2.icon} layout="fill" alt="" />
							</div>
						)}
					</div>
					<div className={styles.text}>
						<p>
							{bet?.token1?.symbol}
							{bet.token2?.symbol && `/${bet?.token2?.symbol}`}
						</p>
					</div>
				</div>
			</div>
			<div className={styles.mob_body}>
				<div className={styles.row}>
					<div className={styles.text}>
						<h5>Due Date</h5>
					</div>
					<div className={styles.text}>
						<p>
							{date}, {formattedTime}{" "}
						</p>
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles.text}>
						<h5>Bet Condition</h5>
					</div>
					<div className={styles.text}>
						<span>{bet?.betCondition}</span>
					</div>
				</div>
				<OddsCard
					winOdds={bet?.apy?.agree}
					drawOdds={100 - (+bet?.apy?.agree + +bet?.apy?.disagree)}
					lossOdds={bet?.apy?.disagree}
					data={bet}
					type={bet?.betType}
				/>
			</div>
		</div>
	);
};
