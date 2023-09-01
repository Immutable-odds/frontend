import React from "react";
import "swiper/css";
import styles from "./DashboardTrendingCard.module.scss";
import Image from "next/legacy/image";
import { Countdown, OddsCard } from "@/shared";
import { convertEpochToFormattedDate } from "@/utils";

const DashboardTrendingCard = ({ match }) => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.text}>
					<h3>Trending Matches</h3>
				</div>
			</div>
			<Card
				epochTime={match?.timestamp / 1000}
				odds={{ winOdds: match?.apy?.win, drawOdds: match?.apy?.draw, lossOdds: match?.apy?.loss}}
				match={match}
			/>
		</div>
	);
};

export default DashboardTrendingCard;

interface CardProps {
	epochTime: number;
	odds: {
		winOdds: number;
		lossOdds: number;
		drawOdds: number;
	};
	match?: any;
}

const Card = ({ epochTime, odds, match }: CardProps) => {
	const formattedDate = convertEpochToFormattedDate(epochTime);

	return (
		<div className={styles.card}>
			<div className={styles.card_header}>
				<div className={styles.small_row}>
					<div className={styles.icon}>
						<Image src={"/svgs/premier-league.svg"} layout="fill" alt="" />
					</div>
					<div className={styles.text}>
						<h3>Premier League</h3>
					</div>
				</div>
				<div className={styles.small_row}>
					<div className={styles.share_icon}>
						<Image src="/svgs/icon-share.svg" layout="fill" alt="" />
					</div>
					<div className={styles.text}>
						<p>Share</p>
					</div>
				</div>
			</div>
			<div className={styles.card_body}>
				<div className={styles.row}>
					<div className={styles.block}>
						<div className={styles.icon_block}>
							<div className={styles.icon_container}>
								<div className={styles.icon}>
									<Image
										src={match.homeTeam.crest}
										layout="fill"
										alt=""
									/>
								</div>
							</div>
						</div>
						<div className={styles.text}>
							<h4>{match.homeTeam.shortName}</h4>
						</div>
					</div>
					<div className={styles.block}>
						<div className={styles.text} style={{ marginBottom: "1.6rem" }}>
							<p>
								{formattedDate?.dayOfWeek} {formattedDate?.day}{" "}
								{formattedDate?.monthOfYear} | {formattedDate?.hours}:
								{formattedDate?.minutes}
							</p>
						</div>
						<div className={styles.text}>
							<h1>VS</h1>
						</div>
						<div className={styles.desk_block}>
							<OddsCard
								winOdds={odds.winOdds}
								drawOdds={odds.drawOdds}
								lossOdds={odds.lossOdds}
								showTitle
								className={styles.odds_block}
								data={match}
							/>
							<Countdown epochTime={epochTime} />
						</div>
					</div>
					<div className={styles.block}>
						<div className={styles.icon_block}>
							<div className={styles.icon_container}>
								<div className={styles.icon}>
									<Image
										src={match.awayTeam.crest}
										layout="fill"
										alt=""
									/>
								</div>
							</div>
						</div>
						<div className={styles.text}>
							<h4>{match.awayTeam.shortName}</h4>
						</div>
					</div>
				</div>
				<div className={styles.mob_block}>
					<OddsCard
						winOdds={odds.winOdds}
						drawOdds={odds.drawOdds}
						lossOdds={odds.lossOdds}
						showTitle
						className={styles.odds_block}
						data={match}
					/>
					<Countdown epochTime={epochTime} />
				</div>
			</div>
		</div>
	);
};
