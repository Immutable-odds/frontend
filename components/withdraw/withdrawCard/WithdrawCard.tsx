import { Button, InputField } from "@/shared";
import { formatNum } from "@/utils";
import Image from "next/legacy/image";
import React, { useState } from "react";
import WithdrawModal from "../withdrawModal/WithdrawModal";
import styles from "./WithdrawCard.module.scss";

interface Props {
	type?: "wallet" | "points";
	balance: number;
}

const WithdrawCard = ({ type = "wallet", balance }: Props) => {
	const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
	const [openModal, setOpenModal] = useState<boolean>(true);
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
							<Image src="/svgs/logo-small.svg" layout="fill" alt="" />
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
			<Button buttonType="transparent" className={styles.button}>
				Withdraw
			</Button>
			<WithdrawModal openModal={openModal} setOpenModal={setOpenModal} />
		</div>
	);
};

export default WithdrawCard;
