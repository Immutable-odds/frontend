import { formatISODate } from "@/mock";
import { Icon } from "@/shared";
import { formatNum, stringShortner } from "@/utils";
import styles from "./BetHistoryCard.module.scss";

enum BETTYPE {
	football = "football",
	crypto = "crypto",
}

const getBetStatus = (param: string) => {
    if(param === "open") return "On Going";
    return "Closed"
}

const checkFootballWinner = (param: string): string => {
    const value = param?.startsWith("HOME")
        ? "Home Win"
        : param?.startsWith("AWAY")
        ? "Away Win"
        : "";

    return value;
};

const BetHistoryCard = ({ bet }: any) => {
    const poolDetails = bet?.pool
	const showSecondIcon =
		(bet.betType === BETTYPE.football && poolDetails?.awayTeam?.crest) ||
		(bet.betType === BETTYPE.crypto && poolDetails?.token2?.icon);
	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<div className={styles.small_row}>
					<Icon
						src={
							bet.betType === BETTYPE.football
								? poolDetails?.homeTeam?.crest
								: poolDetails?.token1?.icon
						}
						className={styles.icon}
					/>
					{showSecondIcon && (
						<Icon src={showSecondIcon} className={styles.icon} />
					)}
					<div className={styles.desk_text}>
						<h4>
							{bet.betType === BETTYPE.football
								? `${poolDetails?.homeTeam?.name} vs ${poolDetails?.awayTeam?.name}`
								: `${poolDetails?.token1?.symbol} ${poolDetails?.token2?.symbol ? ["/", poolDetails?.token2?.symbol].join(" ") : ""}`}
						</h4>
					</div>
					<div className={styles.mob_text}>
						<h4>
							{bet.betType === BETTYPE.football
								? `${bet?.homeTeam?.shortName} vs ${bet?.awayTeam?.shortName}`
								: `${poolDetails?.token1?.symbol} ${poolDetails?.token2?.symbol ? ["/", poolDetails?.token2?.symbol].join(" ") : ""}`}
						</h4>
					</div>
				</div>
				<div className={styles.bet_result} data-type={bet.status}>
					<p>{getBetStatus(bet.status)}</p>
				</div>
			</div>
			<div className={styles.body} data-type={bet.betType}>
				<div className={styles.block}>
					<div className={styles.text}>
						<p>ID</p>
					</div>
					<div className={styles.text}>
						<h3>{poolDetails?.poolData?.poolId}</h3>
					</div>
				</div>
				<div className={styles.block}>
					<div className={styles.text}>
						<p>Date</p>
					</div>
					<div className={styles.text}>
						<h3>{formatISODate(bet.createdAt)}</h3>
					</div>
				</div>
				<div className={styles.block}>
					<div className={styles.text}>
						<p>Stake</p>
					</div>
					<div className={styles.text}>
						<h3>${formatNum(bet?.amount)}</h3>
					</div>
				</div>
				<div className={styles.block}>
					<div className={styles.text}>
						<p>Total Return</p>
					</div>
					<div className={styles.text}>
						<h3>${formatNum(+bet?.amount * +bet?.odd)}</h3>
					</div>
				</div>
				<div className={styles.block}>
					<div className={styles.text}>
						<p>Bet made</p>
					</div>
					<div className={styles.text}>
						<h3>{poolDetails?.betCondition}</h3>
					</div>
				</div>
				{bet.betType === BETTYPE.football && (
					<div className={styles.block}>
						<div className={styles.text}>
							<p>Result</p>
						</div>
						<div className={styles.text}>
							<h3>
								{checkFootballWinner(poolDetails?.score?.winner)} (
								{poolDetails?.score?.fullTime.home}-{poolDetails?.score?.fullTime.away})
							</h3>
						</div>
					</div>
				)}
				<div className={styles.block}>
					<div className={styles.text}>
						<p>Odd</p>
					</div>
					<div className={styles.text}>
						<h3>{bet?.odd}</h3>
					</div>
				</div>
                <div className={styles.block}>
					<div className={styles.text}>
						<p>Amount Won</p>
					</div>
					<div className={styles.text}>
						<h3>{bet?.amountWon}</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BetHistoryCard;