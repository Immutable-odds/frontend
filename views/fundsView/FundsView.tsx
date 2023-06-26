import { CryptoDepositCard } from "@/components/deposit";
import { WithdrawCard } from "@/components/withdraw";
import { Button } from "@/shared";
import { stringShortner } from "@/utils";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import styles from "./FundsView.module.scss";

enum View {
	DEPOSIT = "DEPOSIT",
	WITHDRAW = "WITHDRAW",
}

const FundsView = () => {
	const [view, setView] = useState<View>(View.DEPOSIT);
	const [text, setText] = useState<{ title: string; description: string }>({
		title: "Deposit",
		description:
			"Deposit into your wallet and pay for bets without having to worry about gas fees for each transaction while using external wallets.",
	});
	useEffect(() => {
		if (view === View.DEPOSIT) {
			setText({
				title: "Deposit",
				description:
					"Deposit into your wallet and pay for bets without having to worry about gas fees for each transaction while using external wallets.",
			});
			return;
		}
		if (view === View.WITHDRAW) {
			setText({
				title: "Withdraw",
				description:
					"Withdraw fund from your wallet to your bank account or personal wallet",
			});
		}
	}, [view]);

	return (
		<section className={styles.section}>
			<div className={styles.container}>
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
			</div>
			<div className={styles.row}>
				<div className={styles.block}>
					<div className={styles.text}>
						<h3>{text.title}</h3>
						<p>{text.description}</p>
					</div>
					<div className={styles.arrow_icon}>
						<Image src="/svgs/funds-arrow.svg" layout="fill" alt="" />
					</div>
				</div>
				{view === View.DEPOSIT && <CryptoDepositCard />}
				{view === View.WITHDRAW && (
					<div className={styles.block_large}>
						<WithdrawCard balance={10134} />
						<WithdrawCard balance={100000000} type="points" />
					</div>
				)}
			</div>
		</section>
	);
};

export default FundsView;
