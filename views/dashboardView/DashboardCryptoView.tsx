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
import Image from "next/image";

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
	const [isSearching, setIsSearching] = useState<boolean>(false);

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

	// const filteredListByNetwork = useMemo(() => {
	// 	if (network === "all") return cryptoBetList;
	// 	return cryptoBetList.filter(item => item.network === network);
	// }, [cryptoBetList]);

	// const handleSearch = (searchTerm: string) => {
	// 	const lowercaseSearchTerm = searchTerm.toLowerCase();
	// 	if (searchTerm !== "") {
	// 		setIsSearching(true);
	// 	}
	// 	if (searchTerm === "") {
	// 		setCryptoBetList(cryptoBets);
	// 		setIsSearching(false);
	// 		return;
	// 	}
	// 	if (network === "all networks") {
	// 		const filteredBets = cryptoBets.filter(
	// 			bet =>
	// 				bet.token1.toLowerCase().includes(lowercaseSearchTerm) ||
	// 				(bet.token2 && bet.token2.toLowerCase().includes(lowercaseSearchTerm))
	// 		);
	// 		setCryptoBetList(filteredBets);
	// 	} else {
	// 		const filteredBets = cryptoBets.filter(
	// 			bet =>
	// 				(bet.network === network &&
	// 					bet.token1.toLowerCase().includes(lowercaseSearchTerm)) ||
	// 				(bet.token2 && bet.token2.toLowerCase().includes(lowercaseSearchTerm))
	// 		);
	// 		setCryptoBetList(filteredBets);
	// 	}
	// };

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
					<div className={styles.center}>
						<div className={styles.block}>
							<div className={styles.icon}>
								<Image
									src="/svgs/empty-crypto.svg"
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

export default DashboardCryptoView;
