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
import Image from "next/image";

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
			if (!fixtureResponse.data || !fixtureResponse.data.matches) return;
			const matches = fixtureResponse.data.matches;
			const filteredFixtures = matches.filter(
				(fixture: any) => fixture.status === "FINISHED"
			);
			console.log(filteredFixtures);

			setLoading(false);
			setFixtures(formatMatches(filteredFixtures));
		}
	}, [fixtureResponse]);

	const breadCrumbPage =
		fixtures.length &&
		(fixtures[0].area.name === "Spain" &&
		fixtures[0].leagues[0].league === "Primera Division"
			? "La Liga Santanda"
			: fixtures[0].leagues[0].league);

	return (
		<div className={styles.section}>
			<div className={styles.sidebar}>
				<DashboardSider />
			</div>
			<div className={styles.block}>
				<BreadCrumb page={breadCrumbPage} />
				{loading ? (
					<PageLoader />
				) : fixtures.length ? (
					fixtures.map((fixture, index) => (
						<LeagueContainer showAll data={fixture} key={index} />
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
								<p>There is no available bet currently for this League</p>
							</div>
						</div>
					</div>
				)}
			</div>
			<DashboardStakeSider />
		</div>
	);
};

export default LeaguePage;
