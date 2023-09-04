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
import Image from "next/image";
import useSWR from "swr";
import { Fetcher } from "@/utils/fetcher";
import { PageLoader } from "@/shared/loaders";

const DashboardFootballView = () => {
	const [matches, setMatches] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { data: matchResponse } = useSWR<any>("pool/getPoolsByType/football", Fetcher);

	useEffect(() => {
		if (matchResponse?.result?.length) {
			setMatches(matchResponse.result);
			setIsLoading(false);
		}
	}, [matchResponse]);

	const matchList = useMemo(() => formatMatches(matches), [matches]);

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
				{matches.length && <DashboardTrendingCard match={matches[0]} />}
				{isLoading ? (
					<PageLoader />
				) : matchList.length ? (
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
