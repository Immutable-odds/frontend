import {
	DashboardSider,
	DashboardStakeSider,
	LeagueContainer,
} from "@/components/dashboard";
import { BreadCrumb } from "@/shared";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { isEmpty } from "lodash";
import { Fetcher } from "@/utils/fetcher";
import styles from "./LeaguePage.module.scss";
import { formatMatches } from "@/utils";
import { PageLoader } from "@/shared/loaders";

const LeaguePage = () => {
	const router = useRouter();
	const [fixtures, setFixtures] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const leagueQuery: any = router.query.league;
	const { data: fixtureResponse } = useSWR<any>(
		leagueQuery ? `/api/football/fetchLeagueMatches?id=${leagueQuery}` : null,
		Fetcher
	);

	useEffect(() => {
		if (!isEmpty(fixtureResponse)) {
			if (!fixtureResponse.data.matches) return;
			const filteredFixtures = fixtureResponse.data.matches.filter(
				(fixture: any) => fixture.status !== "FINISHED"
			);
			setLoading(false);
			setFixtures(formatMatches(fixtureResponse.data.matches));
		}
	}, [fixtureResponse]);

	return (
		<div className={styles.section}>
			<div className={styles.block}>
				<DashboardSider />
			</div>
			<div className={styles.block}>
				<BreadCrumb
					page={
						fixtures.length > 0 &&
						(fixtures[0].area.name === "Spain" &&
						fixtures[0].leagues[0].league === "Primera Division"
							? "La Liga Santanda"
							: fixtures[0].leagues[0].league)
					}
				/>
				{loading || fixtures.length === 0 ? (
					<PageLoader />
				) : (
					fixtures.map((fixture, index) => (
						<LeagueContainer showAll data={fixture} key={index} />
					))
				)}
			</div>
			<DashboardStakeSider />
		</div>
	);
};

export default LeaguePage;
