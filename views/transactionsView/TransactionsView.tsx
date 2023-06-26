import { Title } from "@/shared";
import { TransactionTable } from "@/shared/tables";
import React from "react";
import styles from "./TransactionsView.module.scss";

const TransactionsView = () => {
	const generateDataArray = (): Array<{
		time: number;
		type: string;
		betId: string;
		amount: number;
		status: string;
		amountType: string;
	}> => {
		const types = ["football", "crypto", "prediction"];
		const statuses = ["successful", "failed", "processing"];
		const amountType = ["points", "wallet"];
		const dataArray: Array<{
			time: number;
			type: string;
			betId: string;
			amount: number;
			status: string;
			amountType: string;
		}> = [];

		const getRandomBetId = (): string => {
			let result = "";
			const characters =
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			const charactersLength = characters.length;
			for (let i = 0; i < 12; i++) {
				result += characters.charAt(Math.floor(Math.random() * charactersLength));
			}
			return result;
		};

		for (let i = 0; i < 50; i++) {
			const currentTime = 1684528117;
			const randomType = types[Math.floor(Math.random() * types.length)];
			const randomAmountType =
				amountType[Math.floor(Math.random() * amountType.length)];
			const randomBetId = getRandomBetId();
			const randomAmount = Math.floor(Math.random() * 10000) + 1;
			const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

			dataArray.push({
				time: currentTime,
				type: randomType,
				betId: randomBetId,
				amount: randomAmount,
				status: randomStatus,
				amountType: randomAmountType,
			});
		}

		return dataArray;
	};

	// Example usage:
	const data = generateDataArray();
	return (
		<section className={styles.section}>
			<div className={styles.row}>
				<Title title="Transaction History" />
			</div>
			<TransactionTable data={data} />
		</section>
	);
};

export default TransactionsView;
