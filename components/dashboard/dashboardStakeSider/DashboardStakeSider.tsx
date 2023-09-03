import { useGlobalContext } from "@/contexts/AppContext";
import Image from "next/image";
import React, { useState } from "react";
import DashboardStakeSiderForm from "./DashboardStakeSiderForm";
import styles from "./DashboardStakeSider.module.scss";
import { useRouter } from "next/router";

export enum Option {
	Nil,
	Under, // Lose
	Same, // Draw
	Over, // Win
}

const DashboardStakeSider = () => {
	const router = useRouter();
	const { stakeSlip, setStakeSlip }: any = useGlobalContext();
	const [showSlip, setShowSlip] = useState<boolean>(false);

	return (
		<div className={styles.container} data-active={showSlip}>
			<div className={styles.referral_container}>
				<Image src="/svgs/referral.svg" fill sizes="100vw" alt="" />
				<div className={styles.referral}>
					<div className={styles.text}>
						<h1>Get 500 Points</h1>
						<h6>For every friend you refer</h6>
						<span onClick={() => router.push("/settings/referral")}>
							Get Started
						</span>
					</div>
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.header}>
					<div className={styles.small_row}>
						<div className={styles.text}>
							<h2>Stake Slip</h2>
						</div>
						{stakeSlip.length > 0 && (
							<div className={styles.staked_amount}>{stakeSlip.length}</div>
						)}
					</div>
					<div className={styles.small_row}>
						{stakeSlip.length > 0 && (
							<div className={styles.text} onClick={() => setStakeSlip([])}>
								<h5>Clear Slip</h5>
							</div>
						)}
						<div
							className={styles.chevron_icon}
							onClick={() => setShowSlip(!showSlip)}
						>
							<Image src="/svgs/chevron.svg" fill sizes="100vw" alt="" />
						</div>
					</div>
				</div>
				<div className={styles.body_container}>
					<div className={styles.body}>
						{stakeSlip.length ? (
							stakeSlip.map((stake: any) => (
								<DashboardStakeSiderForm
									stake={stake}
									key={stake.poolData.id}
								/>
							))
						) : (
							<div className={styles.empty_body}>
								<div className={styles.empty_icon}>
									<Image
										src="/svgs/paper.svg"
										fill
										sizes="100vw"
										alt=""
									/>
								</div>
								<div className={styles.empty_text}>
									<div
										className={styles.text}
										style={{ textAlign: "center" }}
									>
										<h3>
											To stake on a match, click the odds, Or insert
											a booking code
										</h3>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardStakeSider;

const Box = ({ stake }: any) => {
	const { stakeSlip, setStakeSlip, setReRender, reRender }: any = useGlobalContext();
	const localSlip = stakeSlip;
	const handleDelete = () => {
		const index = localSlip.findIndex((match: any) => match.id === stake.id);

		if (index !== -1) {
			// Object found, delete it
			localSlip.splice(index, 1);
		}
		setReRender((reRender: boolean) => !reRender);
		setStakeSlip(localSlip);
	};

	return (
		<div className={styles.box}>
			<div className={styles.box_header}>
				<div className={styles.small_row}>
					<div className={styles.small_row} style={{ marginRight: "0.8rem" }}>
						<div className={styles.small_icon_container}>
							<div className={styles.small_icon}>
								<Image
									src={
										stake.betType && stake.betType === "crypto"
											? stake?.token1.icon
											: stake.homeTeam.crest
									}
									fill
									sizes="100vw"
									alt=""
								/>
							</div>
						</div>
						{stake.betType && stake.betType === "crypto" ? (
							stake?.token2?.icon && (
								<div className={styles.small_icon_container}>
									<div className={styles.small_icon}>
										<Image
											src={stake?.token2?.icon}
											fill
											sizes="100vw"
											alt=""
										/>
									</div>
								</div>
							)
						) : (
							<div className={styles.small_icon_container}>
								<div className={styles.small_icon}>
									<Image
										src={stake.awayTeam.crest}
										fill
										sizes="100vw"
										alt=""
									/>
								</div>
							</div>
						)}
					</div>
					{stake.betType && stake.betType === "crypto" ? (
						<div
							className={styles.text}
							data-active={stake.betType && stake.betType === "crypto"}
						>
							<h4>
								{stake?.token1?.symbol}
								{stake?.token2?.symbol && `/${stake?.token2?.symbol}`}
							</h4>
						</div>
					) : (
						<div className={styles.text}>
							<h4>
								{stake.homeTeam.shortName} / {stake.awayTeam.shortName}
							</h4>
						</div>
					)}
				</div>
				<div className={styles.close} onClick={handleDelete}>
					<span></span>
					<span></span>
				</div>
			</div>
			<div className={styles.box_body}>
				<div className={styles.text}>
					<p>{stake.stake}</p>
				</div>
				<div className={styles.text}>
					<p>{stake.odd}</p>
				</div>
			</div>
		</div>
	);
};
