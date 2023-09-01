import Image from "next/legacy/image";
import { useRouter } from "next/router";
import React from "react";
import OddsCard from "../../../shared/oddsCard/OddsCard";
import styles from "./LeagueContainer.module.scss";
import { Icon } from "@/shared";
import { getPoolStage } from "@/utils";

interface Props {
	data: any;
	league?: string;
	showAll?: boolean;
}

const LeagueContainer = ({ data, showAll = false, league }: Props) => {
	const router = useRouter();
	return (
		<>
			{data
				? data.leagues.map((league: any, index: number) => (
						<div className={styles.container} key={index}>
							<div className={styles.row}>
								<div className={styles.small_row}>
									<Icon
										src={data.area.flag}
										className={styles.large_icon}
									/>
									<div className={styles.text}>
										<h3>
											{data.area.name === "Spain" &&
											league.league === "Primera Division"
												? "La Liga Santanda"
												: league.league}
										</h3>
										<h6>{data.area.name}</h6>
									</div>
								</div>
								{!showAll && league.length > 3 && (
									<div
										className={styles.small_row}
										style={{ cursor: "pointer" }}
										onClick={() =>
											router.push(
												`/football/${data.area.name.toLowerCase()}/${
													league.id
												}`
											)
										}
									>
										<div className={styles.text}>
											<span>View All</span>
										</div>
										<div className={styles.chevron}>
											<Image
												src="/svgs/chevron-primary.svg"
												layout="fill"
												alt=""
											/>
										</div>
									</div>
								)}
							</div>
							{showAll
								? league.matches.map((match: any, index: number) => (
										<Card match={match} key={index} />
								  ))
								: league.matches
										.slice(0, 3)
										.map((match: any, index: number) => (
											<Card match={match} key={index} />
										))}
						</div>
				  ))
				: null}
		</>
	);
};

export default LeagueContainer;

const getTimeAndDate = (datetime: string | number) => {
	const localTime = new Date(datetime).toLocaleString(undefined, {
		timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	});
	const [date, time] = localTime.split(", ");
	const formattedTime = time?.slice(0, -3);

	return { date, time: formattedTime }
}

const Card = ({ match }: any) => {
	const betClosingTime = getTimeAndDate(match?.poolData?.duration)
	const poolClosingTime = getTimeAndDate(match?.poolData?.stakeDuration)
	const poolStage = getPoolStage(match)

	const poolStatusText = poolStage === 'open'
		? `${poolStage}: ${betClosingTime.date}, ${betClosingTime.time}`
		: poolStage === 'vesting' ? `${poolStage}: ${poolClosingTime.date}, ${poolClosingTime.time}`
			: poolStage
	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<div className={styles.row}>
					<div className={styles.text}>
						<p>
							{poolStatusText}
						</p>
					</div>
					<div className={styles.title_container}>
						<div className={styles.title}>
							<div className={styles.text}>
								<h5>HW</h5>
							</div>
						</div>
						<div className={styles.title}>
							<div className={styles.text}>
								<h5>D</h5>
							</div>
						</div>
						<div className={styles.title}>
							<div className={styles.text}>
								<h5>AW</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.block}>
					<div className={styles.small_row}>
						<Icon src={match.homeTeam.crest} className={styles.icon} />
						<div className={styles.text}>
							<p>{match.homeTeam.shortName}</p>
						</div>
					</div>
					<div className={styles.small_row}>
						<Icon src={match.awayTeam.crest} className={styles.icon} />
						<div className={styles.text}>
							<p>{match.awayTeam.shortName}</p>
						</div>
					</div>
				</div>
				<OddsCard winOdds={match?.apy?.win} drawOdds={match?.apy?.draw} lossOdds={match?.apy?.loss} data={match} />
			</div>
		</div>
	);
};
