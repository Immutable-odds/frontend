import { competitions, popularTokens } from "@/mock";
import { SearchBox } from "@/shared";
import { formatCompetitons, formatMatches, shortenTitle } from "@/utils";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./DashboardSider.module.scss";

const DashboardSider = ({ page }: {page?: string}) => {
	const router = useRouter();
	const matchList = formatCompetitons(competitions);
	const checkActive = (url: string) => {
		let isActive = url === router.asPath;
		return isActive;
	};
	return (
		<div className={styles.container}>
			<SearchBox />
			{page === "crypto" ? (
				<div className={styles.block}>
					<div className={styles.title}>
						<h3>Popular Tokens</h3>
					</div>
					{popularTokens.map((token: any, index) => (
						<div className={styles.row} key={index}>
							<div className={styles.icon}>
								<Image src={token.icon} layout="fill" alt="" />
							</div>
							<div className={styles.text}>
								<p>{token.token}</p>
							</div>
						</div>
					))}
				</div>
			) : (
				matchList.map((match: any, index: number) => (
					<div className={styles.block} key={index}>
						<div className={styles.title}>
							<h3>{match.area.name}</h3>
						</div>
						{match.leagues.map((league: any, index: number) => (
							<Link
								href={`/football/${match.area.name.toLowerCase()}/${
									league.info.id
								}`}
								key={index}
							>
								<div
									className={styles.row}
									data-active={checkActive(
										`/football/${match.area.name.toLowerCase()}/${
											league.info.id
										}`
									)}
								>
									<div className={styles.icon}>
										<Image
											src={league.info.icon}
											layout="fill"
											alt=""
										/>
									</div>
									<div className={styles.text}>
										<p>
											{shortenTitle(
												match.area.name === "Spain" &&
													league.league === "Primera Division"
													? "La Liga Santanda"
													: league.league,
												25
											)}
										</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				))
			)}
		</div>
	);
};

export default DashboardSider;
