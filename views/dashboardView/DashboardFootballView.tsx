import {
	DashboardPointsCard,
	DashboardSider,
	DashboardTrendingCard,
	DashboardStakeSider,
	LeagueContainer,
} from "@/components/dashboard";
import { formatMatches } from "@/utils";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { isEmpty } from "lodash";
import { Fetcher } from "@/utils/fetcher";
import styles from "./DashboardView.module.scss";
import { footballMatches } from "@/mock";
import { ButtonNav } from "@/shared";
import { getPoolsByType } from "@/services/API";

const DashboardFootballView = () => {
	const [matches, setMatches] = useState<any[]>([]);
	// const { data: fixtureResponse } = useSWR<any>(
	// 	`/api/football/fetchRecentMatches`,
	// 	Fetcher
	// );

	// useEffect(() => {
	// 	if (!isEmpty(fixtureResponse)) {
	// 		if (!fixtureResponse.data.matches) return;
	// 		const filteredFixtures = fixtureResponse.data.matches.filter(
	// 			(fixture: any) => fixture.status !== "FINISHED"
	// 		);
	// 		setMatches(filteredFixtures);
	// 	}
	// }, [fixtureResponse]);

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

	const matchList = formatMatches(footballMatches);

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
				{[].length ? matchList.map((matchesData, index) => (
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
