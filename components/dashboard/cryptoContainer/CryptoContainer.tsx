import { Icon, OddsCard } from "@/shared";
import { CryptoBet } from "@/types";
import Image from "next/image";
import React from "react";
import styles from "./CryptoContainer.module.scss";
import { getPoolStage } from "@/utils";

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

const getTimeAndDate = (datetime: string | number) => {
	const localTime = new Date(datetime).toLocaleString(undefined, {
		timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	});
	const [date, time] = localTime.split(", ");
	const formattedTime = time.slice(0, -3);

	return { date, time: formattedTime };
};

const Card = ({ bet }: CardProps) => {
	const betClosingTime = getTimeAndDate(bet?.poolData?.duration);
	const poolClosingTime = getTimeAndDate(bet?.poolData?.stakeDuration);
	const poolStage = getPoolStage(bet);

	const poolStatusText =
		poolStage === "open"
			? `${poolStage}: ${betClosingTime.date}, ${betClosingTime.time}`
			: poolStage === "vesting"
			? `${poolStage}: ${poolClosingTime.date}, ${poolClosingTime.time}`
			: poolStage;
	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<div className={styles.card_row}>
					<div className={styles.text}>
						<p>{poolStatusText}</p>
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
						<Icon
							src={
								"https://assets-cdn.trustwallet.com/blockchains/smartchain/assets/0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c/logo.png"
							}
							className={styles.icon}
							title={bet?.token1?.symbol}
						/>
						{bet?.token2?.icon && (
							<Icon
								src={bet?.token2?.icon}
								className={styles.icon}
								title={bet?.token2?.symbol}
							/>
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
							<Icon src={bet?.token1?.icon1} title={bet?.token1?.symbol} />
						</div>
						{bet?.token2?.icon && (
							<div className={styles.icon}>
								<Icon
									src={bet?.token2.icon}
									title={bet?.token2?.symbol}
								/>
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
						<p>{poolStatusText}</p>
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
