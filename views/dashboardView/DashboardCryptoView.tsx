import React, { useEffect, useState } from "react";
import { cryptoBets } from "@/mock";
import {
	DashboardPointsCard,
	DashboardSider,
	CryptoContainer,
	DashboardStakeSider,
} from "@/components/dashboard";
import styles from "./DashboardView.module.scss";
import { Select } from "@/shared";
import { CryptoBet } from "@/types";

const DashboardCryptoView = () => {
	const [cryptoBetList, setCryptoBetList] = useState<CryptoBet[]>(cryptoBets);
	const [network, setNetwork] = useState<string>("all networks");
	useEffect(() => {
		if (network === "all networks") {
			setCryptoBetList(cryptoBets);
			return;
		}
		const networkFilteredBetList = cryptoBets.filter(
			bets => bets.network === network
		);
		setCryptoBetList(networkFilteredBetList);
	}, [network]);
	return (
		<div className={styles.section}>
			<div className={styles.block}>
				<DashboardSider />
			</div>
			<div className={styles.block}>
				<DashboardPointsCard />
				<div className={styles.row}>
					<div className={styles.text}>
						<h1>All Tokens / Pairs</h1>
					</div>
					<div className={styles.small_row}>
						<Select
							options={[
								"all networks",
								"ethereum",
								"binance smart chain",
								"heco",
								"cardano",
							]}
							onOptionChange={setNetwork}
						/>
					</div>
				</div>
				<CryptoContainer cryptoBets={cryptoBetList} />
			</div>
			<DashboardStakeSider />
		</div>
	);
};

export default DashboardCryptoView;
