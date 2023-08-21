import { useGlobalContext } from "@/contexts/AppContext";
import { Button, DetailContainer, InputField } from "@/shared";
import Image from "next/legacy/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./DashboardStakeSider.module.scss";
import { useWeb3React } from "@web3-react/core";
import { approveTransaction, stakeCustomBet } from "@/utils/callContract";
import { useStore } from "@/contexts/StoreContext";
import { saveUserBet } from "@/services/API";
import { getDaysFactor } from "@/utils/getDaysFactor";

const DashboardStakeSider = () => {
	const { active, library } = useWeb3React()
	const [userData] = useStore()
	const { stakeSlip, setStakeSlip }: any = useGlobalContext()
	const [stakeAmount, setStakeAmount] = useState<number>(0)
	const [showSlip, setShowSlip] = useState<boolean>(false)
	const totalOdds = stakeSlip.reduce((sum: number, number: any) => {
		return sum + number.odd;
	}, 0)

	const handleSubmit = async (stake: any) => {
		try {
			if (stakeAmount < 1) {
				toast.error(
					"Amount too low to stake"
				);
				return;
			}
			const signer = library?.getSigner()

			const payment = await approveTransaction({
				amount: stakeAmount.toString(),
				address: stake.poolData?.paymentToken,
				signer
			});
			if (!payment) return;

			let stakeOption = 0;
			if (stake?.betType === 'crypto') {
				stakeOption = stake.stake === "i agree" ? 3 : 1
			}
			const stakeResult = await stakeCustomBet({
				poolId: stake?.poolData?.poolId,
				amount: stakeAmount.toString(),
				option: stakeOption,
				signer
			});
			const response = await saveUserBet({
				uuid: userData?.uuid,
				poolId: stake?.poolData?.poolId,
				amount: stakeAmount,
				odd: +stake?.odd,
				status: 'open'
			})
			if (stakeResult) toast.success("Your bets have been placed")
		} catch (error) {
			toast.error(
				"Could not process stake"
			);
		}
	};

	return (
		<div className={styles.container} data-active={showSlip}>
			<div className={styles.referral_container}>
				<Image src="/svgs/referral.svg" layout="fill" alt="" />
				<div className={styles.referral}>
					<div className={styles.text}>
						<h1>Get 500 Points</h1>
						<h6>For every friend you refer</h6>
						<span>Get Started</span>
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
							<Image src="/svgs/chevron.svg" layout="fill" alt="" />
						</div>
					</div>
				</div>
				<div className={styles.body_container}>
					<div className={styles.body}>
						{stakeSlip.length > 0 ? (
							stakeSlip.map((stake: any, index: number) => (
								<div key={index}>
									<Box stake={stake} key={index} />
									<form className={styles.payment_body} onSubmit={(e) => {
										e.preventDefault()
										handleSubmit(stake)
									}}>
										<InputField
											label="Staking Amount"
											value={stakeAmount}
											onChange={(e: any) => setStakeAmount(e.target.value)}
										/>
										<div className={styles.details_card}>
											<div className={styles.details_header}>
												<div className={styles.text}>
													<h4>My Bet Stats</h4>
												</div>
											</div>
											<div className={styles.detail_body}>
												<DetailContainer
													title="Odds"
													value={totalOdds}
												/>
												<DetailContainer
													title="Your stake amount"
													value={stakeAmount}
													prefix="$"
												/>
												<DetailContainer
													title="Expected payout"
													value={stakeAmount * totalOdds}
													prefix="$"
													description="Total amount you'll earn if your bet wins"
												/>
												<DetailContainer
													title="Days factor"
													value={getDaysFactor(stake?.poolData?.stakeDuration)}
													description="Duration of this pool"
												/>
											</div>
										</div>
										{
											active ? (<Button
												buttonType="primary"
												type="submit"
												className={styles.button}
											>
												Stake Bet
											</Button>) : (
												<p style={{ textAlign: 'center', marginTop: '1rem' }}>Connect wallet to stake</p>
											)
										}

									</form>
								</div>
							))
						) : (
							<div className={styles.empty_body}>
								<div className={styles.empty_icon}>
									<Image src="/svgs/paper.svg" layout="fill" alt="" />
								</div>
								<div className={styles.empty_text}>
									<div
										className={styles.text}
										style={{ textAlign: "center" }}
									>
										<h3>
											To stake on a match, click the odds.Or insert
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
									layout="fill"
									alt=""
								/>
							</div>
						</div>
						{stake.betType && stake.betType === "crypto" ? (
							stake?.token2?.icon && (
								<div className={styles.small_icon_container}>
									<div className={styles.small_icon}>
										<Image src={stake?.token2?.icon} layout="fill" alt="" />
									</div>
								</div>
							)
						) : (
							<div className={styles.small_icon_container}>
								<div className={styles.small_icon}>
									<Image
										src={stake.awayTeam.crest}
										layout="fill"
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
