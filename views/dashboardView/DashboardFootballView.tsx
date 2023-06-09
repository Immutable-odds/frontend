import {
	DashboardPointsCard,
	DashboardSider,
	DashboardTrendingCard,
	DashboardStakeSider,
	LeagueContainer,
} from "@/components/dashboard";
import { formatMatches } from "@/utils";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { isEmpty } from "lodash";
import { Fetcher } from "@/utils/fetcher";
import styles from "./DashboardView.module.scss";
import { footballMatches } from "@/mock";
import { ButtonNav } from "@/shared";

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
	const matchList = formatMatches(footballMatches);

	return (
		<div className={styles.section}>
			<div className={styles.sider_block}>
				<DashboardSider />
			</div>
			<div className={styles.block}>
				<DashboardPointsCard />
				<div className={styles.mob_button_nav}>
					<ButtonNav />
				</div>
				<DashboardTrendingCard />
				{matchList.map((matchesData, index) => (
					<LeagueContainer data={matchesData} key={index} />
				))}
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
