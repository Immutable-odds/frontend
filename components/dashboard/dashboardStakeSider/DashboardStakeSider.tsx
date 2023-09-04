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
