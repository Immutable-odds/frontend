import {
	DashboardPointsCard,
	DashboardSider,
	DashboardTrendingCard,
	DashboardStakeSider,
	LeagueContainer,
} from "@/components/dashboard";
import { formatMatches } from "@/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./DashboardView.module.scss";
import { ButtonNav } from "@/shared";
import { getPoolsByType } from "@/services/API";

const DashboardFootballView = () => {
	const [matches, setMatches] = useState<any[]>([]);
	const effectCalled = useRef(false)
	useEffect(() => {
		if (effectCalled.current) return;
		effectCalled.current = true;

		const loadData = async () => {
			const data = await getPoolsByType("football")
			setMatches(data?.result)
			console.log(data?.result);
		}

		loadData();
	}, [matches])

	const matchList = useMemo(() => formatMatches(matches), [matches]);

	return (
		<div className={styles.section}>
			<div className={styles.sider_block}>
				<DashboardSider page="football" />
			</div>
			<div className={styles.block}>
				<DashboardPointsCard />
				<div className={styles.mob_button_nav}>
					<ButtonNav />
				</div>
				{/* <DashboardTrendingCard /> */}
				{matchList.length ? matchList.map((matchesData, index) => (
					<LeagueContainer data={matchesData} key={index} />
				)) : <p>No available pool to display</p>}
			</div>
			<div>
				<div className={styles.button_nav}>
					<ButtonNav />
				</div>
				<DashboardStakeSider />
			</div>
		</div>
	);
};

export default DashboardFootballView;
