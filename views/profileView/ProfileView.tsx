import {
	ProfileCard,
	StatCard,
	ProfileBalanceCard,
	ProfileProfitCard,
	ProfileReferralCard,
} from "@/components/profile";
import { Button } from "@/shared";
import React, { useEffect, useState } from "react";
import styles from "./ProfileView.module.scss";

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

const stats = { bets: 36, amountWon: 160000, pointsWon: 160000 };

enum MobileView {
	STATS = "STATS",
	PROFILE = "PROFILE",
}

const ProfileView = () => {
	const [chartData, setChartData] = useState<any[]>([]);
	const [view, setView] = useState<MobileView>(MobileView.STATS);
	useEffect(() => {
		const data = generateMockData();
		setChartData(data);
	}, []);
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
							points={stats.pointsWon}
							balance={stats.amountWon}
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
						<ProfileReferralCard />
					</div>
				</>
			)}
		</section>
	);
};

export default ProfileView;
