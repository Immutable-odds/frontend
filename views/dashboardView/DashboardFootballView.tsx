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
import Image from "next/image";

const DashboardFootballView = () => {
	const [matches, setMatches] = useState<any[]>([]);
	const [isSearching, setIsSearching] = useState<boolean>(false);
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

	const effectCalled = useRef(false);
	useEffect(() => {
		if (effectCalled.current) return;
		effectCalled.current = true;

		const loadData = async () => {
			const data = await getPoolsByType("football");
			setMatches(data?.result);

			console.log(data?.result);
		};

		loadData();
	}, [matches]);

	// const searchFootballTermOnChange = (searchTerm: string): void => {
	// 	const lowercaseSearchTerm = searchTerm.toLowerCase();
	// 	if (searchTerm !== "") {
	// 		setIsSearching(true);
	// 	}
	// 	if (searchTerm === "") {
	// 		setMatches(matchList);
	// 		setIsSearching(false);
	// 		return;
	// 	}

	// 	const filteredMatches = matchList.map((item: any) => {
	// 		const awayTeamName = item.leagues[0].matches.filter((match: any) =>
	// 			match.awayTeam.name.toLowerCase().includes(lowercaseSearchTerm)
	// 				? match
	// 				: null
	// 		);
	// 		const homeTeamName = item.leagues[0].matches.filter((match: any) =>
	// 			match.homeTeam.name.toLowerCase().includes(lowercaseSearchTerm)
	// 				? match
	// 				: null
	// 		);
	// 		const competitionName = item.leagues.filter((league: any) =>
	// 			league.league.toLowerCase().includes(lowercaseSearchTerm)
	// 				? league.matches
	// 				: null
	// 		);
	// 		const competitionMatches = competitionName.length
	// 			? competitionName[0].matches
	// 			: null;
	// 		return { ...awayTeamName, ...homeTeamName, ...competitionMatches };
	// 	});
	// 	const spreadObjects = filteredMatches.flatMap(match => Object.values(match));
	// 	const formattedMatches = formatMatches(spreadObjects);

	// 	setMatches(formattedMatches);
	// };

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
				{[].length ? (
					matchList.map((matchesData, index) => (
						<LeagueContainer data={matchesData} key={index} />
					))
				) : (
					<div className={styles.center}>
						<div className={styles.block}>
							<div className={styles.icon}>
								<Image
									src="/svgs/empty-football.svg"
									fill
									sizes="100vw"
									alt=""
								/>
							</div>
							<div className={styles.text}>
								<p>There is no available bet currently</p>
							</div>
						</div>
					</div>
				)}
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
