import React, { useEffect, useState } from "react";
import { cryptoBets } from "@/mock";
import {
	DashboardPointsCard,
	DashboardSider,
	CryptoContainer,
	DashboardStakeSider,
} from "@/components/dashboard";
import styles from "./DashboardView.module.scss";
import { ButtonNav, Select } from "@/shared";
import { CryptoBet, SelectOption } from "@/types";

const networkList: SelectOption[] = [
	{ label: "all", value: "all networks" },
	{ label: "eth", value: "ethereum" },
	{ label: "bsc", value: "binance smart chain" },
	{ label: "heco", value: "heco" },
	{ label: "cardano", value: "cardano" },
];

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
			<div className={styles.sider_block}>
				<DashboardSider />
			</div>
			<div className={styles.block}>
				<DashboardPointsCard />
				<div className={styles.mob_button_nav}>
					<ButtonNav />
				</div>
				<div className={styles.row}>
					<div className={styles.text}>
						<h1>All Tokens / Pairs</h1>
					</div>
					<div className={styles.small_row}>
						<Select options={networkList} onOptionChange={setNetwork} />
					</div>
				</div>
				<CryptoContainer cryptoBets={cryptoBetList} />
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

export default DashboardCryptoView;
