import {
	ProfileCard,
	StatCard,
	ProfileBalanceCard,
	ProfileProfitCard,
	ProfileReferralCard,
} from "@/components/profile";
import { Button, ConnectWallet } from "@/shared";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./ProfileView.module.scss";
import { useWeb3React } from "@web3-react/core";
import { fetchUserInvites, getUserBetStats, getUserBets } from "@/services/API";
import { useStore } from "@/contexts/StoreContext";
import { getWalletBalance } from "@/utils/callContract";

const generateRandomAmount = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

const generateMockData = () => {
	const minAmount = 5000;
	const maxAmount = 50000;
	const daysInWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	const mockData = [];

	for (let i = 0; i < daysInWeek.length; i++) {
		const dailyIncome = generateRandomAmount(minAmount, maxAmount);
		mockData.push({ day: daysInWeek[i], value: dailyIncome });
	}

	return mockData;
};

enum MobileView {
	STATS = "STATS",
	PROFILE = "PROFILE",
}

const ProfileView = () => {
	const { account } = useWeb3React()
	const [userData, setUserData] = useStore()
	const [balance, setBalance] = useState<string>("0")
	const [bets, setBets] = useState<any>(null)
	const [chartData, setChartData] = useState<any[]>([]);
	const [view, setView] = useState<MobileView>(MobileView.STATS);
	const [referralData, setReferralData] = useState<{
		referralId: string;
		totalInvited: number,
		earnings: number;
		invites: string[]
	}>(null)

	useEffect(() => {
		const data = generateMockData();
		setChartData(data);
	}, []);

	useEffect(() => {
		const getBets = async (uuid) => {
			const _bets = await getUserBetStats(uuid)
			setBets(_bets?.result ?? {});
		}
		if (userData?.uuid) {
			getBets(userData.uuid)
		}
	}, [userData])

	useEffect(() => {
		const loadData = async (uuid) => {
			const data = await fetchUserInvites(uuid)
			setReferralData(data?.result);
		}
		if (userData?.uuid)  loadData(userData.uuid)
	}, [userData])

	useEffect(() => {
		const loadBalance = async (_account: string) => {
			const _balance = await getWalletBalance(_account);
			setBalance(_balance ?? "0");
		}
		if (account) loadBalance(account)
	}, [account])

	const stats = useMemo(() => ({
		bets: bets?.totalBets ?? 0,
		amountWon: bets?.totalWon ?? 0,
		pointsWon: bets?.totalPoints ?? 0
	}), [bets])

	return (

		<section className={styles.section}>
			<div className={styles.container}>
				<Button
					buttonType="transparent"
					className={styles.button_container}
					onClick={() => setView(MobileView.STATS)}
				>
					<div
						className={styles.button}
						data-active={view === MobileView.STATS}
					>
						Stats
					</div>
				</Button>
				<Button
					buttonType="transparent"
					className={styles.button_container}
					onClick={() => setView(MobileView.PROFILE)}
				>
					<div
						className={styles.button}
						data-active={view === MobileView.PROFILE}
					>
						Profile
					</div>
				</Button>
			</div>
			<div className={styles.show_desktop}>
				<ProfileCard />
			</div>
			{view === MobileView.PROFILE && (
				<div className={styles.show_mob}>
					<ProfileCard />
				</div>
			)}
			{view === MobileView.STATS && (
				<>
					<div className={styles.stats}>
						<StatCard stats={stats} />
					</div>
					<div className={styles.finance}>
						<ProfileBalanceCard
							balance={parseFloat(balance)}
							points={stats.pointsWon}
						/>
					</div>
					<div className={styles.double_column}>
						<ProfileProfitCard
							chartData={chartData}
							earnings={stats.amountWon}
							points={stats.pointsWon}
						/>
					</div>
					<div className={styles.referral}>
						<ProfileReferralCard referrals={referralData?.invites ?? []} />
					</div>
				</>
			)}
		</section>
	);
};

export default ProfileView;
