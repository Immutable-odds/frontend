import React, { useEffect, useMemo, useRef, useState } from "react";
import {
	DashboardPointsCard,
	DashboardSider,
	CryptoContainer,
	DashboardStakeSider,
} from "@/components/dashboard";
import styles from "./DashboardView.module.scss";
import { ButtonNav, Select } from "@/shared";
import { SelectOption } from "@/types";
import { getPoolsByType } from "@/services/API";

const networkList: SelectOption[] = [
	{ label: "all networks", value: "all" },
	{ label: "ethereum", value: "ethereum" },
	{ label: "binance smart chain", value: "bsc" },
	{ label: "heco", value: "heco" },
	{ label: "cardano", value: "cardano" },
];

const DashboardCryptoView = () => {
	const [cryptoBetList, setCryptoBetList] = useState<any[]>([]);
	const [network, setNetwork] = useState<string>("");

	const effectCalled = useRef(false);
	useEffect(() => {
		if (effectCalled.current) return;
		effectCalled.current = true;

		const loadData = async () => {
			const data = await getPoolsByType("crypto");
			setCryptoBetList(data?.result);
		};

		loadData();
	}, [cryptoBetList]);

	const filteredListByNetwork = useMemo(() => {
		if (network === "all") return cryptoBetList;
		return cryptoBetList.filter(item => item.network === network);
	}, [cryptoBetList]);

	return (
		<div className={styles.section}>
			<div className={styles.sider_block}>
				<DashboardSider page="crypto" />
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
				{cryptoBetList.length ? (
					<CryptoContainer cryptoBets={cryptoBetList} />
				) : (
					<p>No available pool to display</p>
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

export default DashboardCryptoView;
