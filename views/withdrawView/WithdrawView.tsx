import { CryptoDepositCard } from "@/components/deposit";
import { WithdrawCard } from "@/components/withdraw";
import { useGlobalContext } from "@/contexts/AppContext";
import { Button } from "@/shared";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./WithdrawView.module.scss";
import { useStore } from "@/contexts/StoreContext";
import { getUserAllocations, getUserBetStats, getUserPoolIds } from "@/services/API";
import { withdrawFunds } from "@/utils/callContract";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";

enum View {
	DEPOSIT = "DEPOSIT",
	WITHDRAW = "WITHDRAW",
}

const WithdrawView = () => {
	const [userData] = useStore();
	const [earnings, setEarnings] = useState<{ totalWon: number; totalPoints: number }>({
		totalWon: 0,
		totalPoints: 0,
	});
	const [userPoolIds, setUserPoolIds] = useState<number[]>([]);
	const { active, library } = useWeb3React();

	useEffect(() => {
		const loadData = async () => {
			const [allocationResponse, poolIdResponse] = await Promise.all([
				getUserBetStats(userData?.uuid),
				getUserPoolIds(userData.uuid),
			]);
			setEarnings({
				totalWon: allocationResponse?.result?.totalWon ?? 0,
				totalPoints: allocationResponse?.result?.totalPoints ?? 0,
			});
			setUserPoolIds(poolIdResponse?.result ?? []);
		};
		if (userData?.uuid) loadData();
	}, []);

	const handleWithdraw = async () => {
		try {
			const result = await withdrawFunds({
				poolIds: userPoolIds,
				signer: library?.getSigner(),
			});
			if (result) toast.success("Allocations withdrawn to your wallet");
		} catch (error) {
			console.log("Error:", error);
			toast.error("Transaction failed");
		}
	};

	return (
		<section className={styles.section}>
			<div className={styles.row}>
				<div className={styles.block}>
					<div className={styles.text}>
						<h3>Withdraw</h3>
						<p>
							Withdraw fund from your wallet to your bank account or
							personal wallet
						</p>
					</div>
					<div className={styles.arrow_icon}>
						<Image src="/svgs/funds-arrow.svg" fill sizes="100vw" alt="" />
					</div>
				</div>
				<div className={styles.block_large}>
					<WithdrawCard
						balance={earnings.totalWon}
						disableBtn={!earnings.totalWon || !userPoolIds.length}
						onWithdraw={handleWithdraw}
					/>
					<WithdrawCard
						balance={earnings.totalPoints}
						type="points"
						disableBtn={true}
						onWithdraw={handleWithdraw}
					/>
				</div>
			</div>
		</section>
	);
};

export default WithdrawView;
