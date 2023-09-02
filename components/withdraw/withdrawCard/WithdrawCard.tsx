import { Button, InputField } from "@/shared";
import { formatNum } from "@/utils";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./WithdrawCard.module.scss";
import { toast } from "react-toastify";

interface Props {
	type?: "wallet" | "points";
	balance: number;
	onWithdraw: () => void;
	disableBtn?: boolean;
}

const WithdrawCard = ({
	type = "wallet",
	balance,
	disableBtn = false,
	onWithdraw,
}: Props) => {
	const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
	const handleWithdraw = () => {
		if (withdrawAmount > balance) {
			toast.error("Error: Insufficient funds for withdrawal");
			return;
		}
		onWithdraw();
	};
	return (
		<div className={styles.card}>
			{type === "wallet" ? (
				<div className={styles.text}>
					<p>Wallet:</p>
					<h1>${formatNum(balance)}</h1>
				</div>
			) : (
				<>
					<div className={styles.row}>
						<div className={styles.icon}>
							<Image src="/svgs/logo-small.svg" fill sizes="100vw" alt="" />
						</div>
						<div className={styles.text}>
							<p>Immutable Points</p>
						</div>
					</div>
					<div className={styles.text}>
						<h1>{formatNum(balance)}</h1>
					</div>
				</>
			)}
			<InputField
				label="Withdraw Amount"
				className={styles.input}
				value={withdrawAmount}
				onChange={(e: any) => setWithdrawAmount(e.target.value)}
			/>
			<Button
				buttonType="transparent"
				className={styles.button}
				onClick={handleWithdraw}
				disabled={!!disableBtn}
			>
				Withdraw
			</Button>
		</div>
	);
};

export default WithdrawCard;
