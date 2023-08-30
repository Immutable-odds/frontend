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
		leagueQuery ? `pool/getFootballPoolsByCompetitionId/${leagueQuery}` : null,
		Fetcher
	);

	useEffect(() => {
		if (!isEmpty(fixtureResponse)) {
			if (!fixtureResponse?.result.matches) return;
			const filteredFixtures = fixtureResponse?.result?.matches.filter(
				(fixture: any) => fixture.status !== "FINISHED"
			);
			setLoading(false);
			setFixtures(formatMatches(fixtureResponse?.result?.matches));
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
