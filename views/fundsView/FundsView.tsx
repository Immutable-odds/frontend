import { CryptoDepositCard } from "@/components/deposit";
import { WithdrawCard } from "@/components/withdraw";
import { useGlobalContext } from "@/contexts/AppContext";
import { Button } from "@/shared";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./FundsView.module.scss";
import { useStore } from "@/contexts/StoreContext";
import { getUserAllocations, getUserPoolIds } from "@/services/API";
import { withdrawFunds } from "@/utils/callContract";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";

enum View {
	DEPOSIT = "DEPOSIT",
	WITHDRAW = "WITHDRAW",
}

const FundsView = () => {
	const [userData] = useStore()
	const [allocations, setAllocations] = useState<number>(0)
	const [userPoolIds, setUserPoolIds] = useState<number[]>([])
	const [view, setView] = useState<View>(View.WITHDRAW);
	const { active, library } = useWeb3React()
	const [text] = useState<{ title: string; description: string }>({
		title: "Withdraw",
		description: "Withdraw your winnings from all pools to your wallet"
	});

	useEffect(() => {
		const loadData = async () => {
			const [allocationResponse, poolIdResponse] = await Promise.all([
				getUserAllocations({ uuid: userData?.uuid }),
				getUserPoolIds(userData.uuid)
			])
			setAllocations(allocationResponse?.result?.total ?? 0)
			setUserPoolIds(poolIdResponse?.result ?? [])
		}
		if (userData?.uuid) loadData();
	}, [])

	const handleWithdraw = async () => {
		try {
			const result = await withdrawFunds({
				poolIds: userPoolIds,
				signer: library?.getSigner()
			});
			if(result) toast.success("Allocations withdrawn to your wallet")
		} catch (error) {
			console.log("Error:", error);
			toast.error("Transaction failed")
		}
	}

	return (
		<section className={styles.section}>
			{/* <div className={styles.container}>
				<Button
					buttonType="transparent"
					className={styles.button_container}
					onClick={() => setView(View.DEPOSIT)}
				>
					<div className={styles.button} data-active={view === View.DEPOSIT}>
						Deposit
					</div>
				</Button>
				<Button
					buttonType="transparent"
					className={styles.button_container}
					onClick={() => setView(View.WITHDRAW)}
				>
					<div className={styles.button} data-active={view === View.WITHDRAW}>
						Withdraw
					</div>
				</Button>
			</div> */}
			<div className={styles.row}>
				<div className={styles.block}>
					<div className={styles.text}>
						<h3>{text.title}</h3>
						<p>{text.description}</p>
					</div>
					<div className={styles.arrow_icon}>
						<Image src="/svgs/funds-arrow.svg" fill sizes="100vw" alt="" />
					</div>
				</div>
				{view === View.DEPOSIT && <CryptoDepositCard />}
				{view === View.WITHDRAW && (
					<div className={styles.block_large}>
						<WithdrawCard balance={allocations} disableBtn={!allocations || !userPoolIds.length} onWithdraw={handleWithdraw} />
						<WithdrawCard balance={0.00} type="points" disableBtn={true} onWithdraw={handleWithdraw} />
					</div>
				)}
			</div>
		</section>
	);
};

export default FundsView;
