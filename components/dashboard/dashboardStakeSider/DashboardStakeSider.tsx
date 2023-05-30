import { useGlobalContext } from "@/contexts/AppContext";
import { Button, DetailContainer, InputField } from "@/shared";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./DashboardStakeSider.module.scss";

const DashboardStakeSider = () => {
	const router = useRouter();
	const { stakeSlip, setStakeSlip }: any = useGlobalContext();
	const [stakeAmount, setStakeAmount] = useState<number>(0);
	const totalOdds = stakeSlip.reduce((sum: number, number: any) => {
		return sum + number.odd;
	}, 0);

	const checkActive = (url: string) => {
		let isActive = url === router.asPath;
		if (
			url === "/football" &&
			[
				"/brazil",
				"/england",
				"/europe",
				"/spain",
				"/france",
				"/germany",
				"/italy",
				"/netherlands",
				"/portugal",
			].some(partialUrl => router.asPath.includes(`/football${partialUrl}`))
		)
			isActive = true;

		return isActive;
	};
	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (stakeSlip.length < 5) {
			toast.error(
				"You must stake in a minimum of 5 games to complete a Bet request"
			);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.tab_container}>
				<Button
					buttonType="transparent"
					className={styles.button_container}
					onClick={() => {
						router.push("/");
					}}
				>
					<div className={styles.button} data-active={checkActive("/")}>
						Crypto Bets
					</div>
				</Button>
				<Button
					buttonType="transparent"
					className={styles.button_container}
					onClick={() => {
						router.push("/football");
					}}
				>
					<div className={styles.button} data-active={checkActive("/football")}>
						Football Bets
					</div>
				</Button>
			</div>
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
					{stakeSlip.length > 0 && (
						<div className={styles.text} onClick={() => setStakeSlip([])}>
							<h5>Clear Slip</h5>
						</div>
					)}
				</div>
				<div className={styles.body}>
					{stakeSlip.length > 0 ? (
						stakeSlip.map((stake: any, index: number) => (
							<Box stake={stake} key={index} />
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
										To stake on a match, click the odds.Or insert a
										booking code
									</h3>
								</div>
							</div>
						</div>
					)}
				</div>
				{stakeSlip.length > 0 && (
					<form className={styles.payment_body} onSubmit={handleSubmit}>
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
									title="My Total Odds"
									value={totalOdds}
								/>
								<DetailContainer
									title="My Stake Amount"
									value={stakeAmount}
									prefix="$"
								/>
								<DetailContainer
									title="Potential Win"
									value={stakeAmount * totalOdds}
									prefix="$"
									description="hdlskdijn"
								/>
								<DetailContainer
									title="Expected Payout"
									value={stakeAmount * totalOdds}
									prefix="$"
									description="hdlskdijn"
								/>
							</div>
							<div
								className={styles.details_header}
								style={{ marginTop: "0.8rem" }}
							>
								<div className={styles.text}>
									<h4>Overall Pool Stats</h4>
								</div>
							</div>
							<div className={styles.detail_body}>
								<DetailContainer
									title="Total Bets"
									value={stakeSlip.length}
								/>
								<DetailContainer
									title="Total Bet Odds"
									value={totalOdds}
								/>
								<DetailContainer
									title="Bet Amounts"
									value={stakeAmount * totalOdds}
									prefix="$"
									description="hdlskdijn"
								/>
								<DetailContainer
									title="Days Factor"
									value={5}
									description="hdlskdijn"
								/>
							</div>
						</div>
						<Button
							buttonType="primary"
							type="submit"
							className={styles.button}
						>
							Stake Bet
						</Button>
					</form>
				)}
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
											? stake.icon1
											: stake.homeTeam.crest
									}
									layout="fill"
									alt=""
								/>
							</div>
						</div>
						{stake.betType && stake.betType === "crypto" ? (
							stake.icon2 && (
								<div className={styles.small_icon_container}>
									<div className={styles.small_icon}>
										<Image src={stake.icon2} layout="fill" alt="" />
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
								{stake.token1}
								{stake.token2 && `/${stake.token2}`}
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
