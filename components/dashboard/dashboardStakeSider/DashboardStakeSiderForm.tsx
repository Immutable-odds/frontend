import React, { useEffect, useState } from "react";
import styles from "./DashboardStakeSider.module.scss";
import Image from "next/image";
import { useGlobalContext } from "@/contexts/AppContext";
import { Button, DetailContainer, InputField } from "@/shared";
import { useWeb3React } from "@web3-react/core";
import { useStore } from "@/contexts/StoreContext";
import { ADDRESS_ZERO } from "@/config";
import { useRouter } from "next/router";
import { approveTransaction, stakeCustomBet, stakeNativeBet } from "@/utils/callContract";
import { fetchUserByRefId, saveUserBet } from "@/services/API";
import { toast } from "react-toastify";
import { getDaysFactor } from "@/utils/getDaysFactor";
export enum Option {
	Nil,
	Under, // Lose
	Same, // Draw
	Over, // Win
}

const DashboardStakeSiderForm = ({ stake }: any) => {
	const { active, library } = useWeb3React();
	const [userData] = useStore();
	const { stakeSlip, setStakeSlip, setReRender }: any = useGlobalContext();
	const [stakeAmount, setStakeAmount] = useState<number>(0);
	const [isActive, setIsActive] = useState<boolean>(false);
	const [referralAddress, setReferralAddress] = useState<string>(ADDRESS_ZERO);
	const totalOdds = stakeSlip.reduce((sum: number, number: any) => {
		return sum + number.odd;
	}, 0);
	const router = useRouter();
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
	useEffect(() => {
		const loadData = async refId => {
			const data = await fetchUserByRefId(refId);
			setReferralAddress(data?.result?.walletAddress ?? ADDRESS_ZERO);
		};
		if (router.query?.ref) loadData(router.query.ref);
	}, [router.query?.ref]);

	const handleSubmit = async (stake: any) => {
		try {
			if (stakeAmount < 1) {
				toast.error("Amount too low to stake");
				return;
			}
			const signer = library?.getSigner();

			let stakeOption = Option.Nil;
			let stakeResult;
			if (stake?.betType === "crypto") {
				stakeOption = stake.stake === "i agree" ? Option.Over : Option.Under;
			} else {
				stakeOption =
					stake.stake === "win"
						? Option.Over
						: stake.stake === "lose"
						? Option.Under
						: Option.Same;
			}

			if (stake.poolData?.paymentToken === "BNB") {
				stakeResult = await stakeNativeBet({
					poolId: stake?.poolData?.poolId,
					amount: stakeAmount.toString(),
					option: stakeOption,
					signer,
					ref: referralAddress,
				});
			} else {
				const payment = await approveTransaction({
					amount: stakeAmount.toString(),
					address: stake.poolData?.paymentToken,
					signer,
				});
				if (!payment) return;

				stakeResult = await stakeCustomBet({
					poolId: stake?.poolData?.poolId,
					amount: stakeAmount.toString(),
					option: stakeOption,
					signer,
					ref: referralAddress,
				});
			}

			await saveUserBet({
				uuid: userData?.uuid,
				poolId: stake?.poolData?.poolId,
				amount: stakeAmount,
				odd: +stake?.odd,
				status: "open",
			});
			if (stakeResult) toast.success("Your bets have been placed");
		} catch (error) {
			toast.error("Could not process stake");
		}
	};
	const handleAccordion = () => {
		setIsActive(isActive => !isActive);
	};
	return (
		<div className={styles.accordion} data-active={isActive}>
			<div className={styles.box}>
				<div className={styles.box_header}>
					<div className={styles.small_row}>
						<div
							className={styles.small_row}
							style={{ marginRight: "0.8rem" }}
						>
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
									{stake.homeTeam.shortName} /{" "}
									{stake.awayTeam.shortName}
								</h4>
							</div>
						)}
					</div>
					<div className={styles.chevron} onClick={handleAccordion}>
						<Image src="/svgs/chevron.svg" fill sizes="100vw" alt="" />
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
			<form
				className={styles.payment_body}
				onSubmit={e => {
					e.preventDefault();
					handleSubmit(stake);
				}}
			>
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
						<DetailContainer title="Odds" value={totalOdds} />
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
				{active ? (
					<div className={styles.button_container}>
						<Button
							buttonType="primary"
							type="submit"
							className={styles.button}
						>
							Stake Bet
						</Button>
						<Button
							buttonType="transparent"
							className={styles.button}
							onClick={handleDelete}
						>
							Cancel Bet
						</Button>
					</div>
				) : (
					<p
						style={{
							textAlign: "center",
							marginTop: "1rem",
						}}
					>
						Connect wallet to stake
					</p>
				)}
			</form>
		</div>
	);
};

export default DashboardStakeSiderForm;
