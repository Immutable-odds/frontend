import { convertEpochToFormattedDate, formatNum } from "@/utils";
import React from "react";
import styles from "./TransactionTable.module.scss";
interface DataItem {
	time: number;
	type: string;
	betId: string;
	amount: number;
	status: string;
	amountType: string;
}

interface Props {
	data: DataItem[];
}

const TransactionTable = ({ data }: Props) => {
	return (
		<div className={styles.table}>
			<div className={styles.table_title}>
				<div className={styles.cell}>
					<p>Time</p>
				</div>
				<div className={styles.cell}>
					<p>Type</p>
				</div>
				<div className={styles.cell}>
					<p>Bet ID</p>
				</div>
				<div className={styles.cell}>
					<p>Amount</p>
				</div>
				<div className={styles.cell}>
					<p>Status</p>
				</div>
			</div>
			<div className={styles.container}>
				{data.map((item, index) => {
					const { year, month, day, hours, minutes, seconds }: any =
						convertEpochToFormattedDate(item.time);
					return (
						<div className={styles.table_row} key={index}>
							<div className={styles.cell}>
								<h6>Time</h6>
								<h3>{`${day}/${month}/${year} | ${hours}:${minutes}:${seconds}`}</h3>
							</div>
							<div className={styles.cell}>
								<h6>Type</h6>
								<h3>{item.type}</h3>
							</div>
							<div className={styles.cell}>
								<h6>Bet ID</h6>
								<h3>{item.betId}</h3>
							</div>
							<div className={styles.cell}>
								<h6>Amount</h6>
								<h3>
									{item.amountType === "wallet" ? "$" : ""}
									{formatNum(item.amount)}
									{item.amountType === "points" ? " Pts" : ""}
								</h3>
							</div>
							<div className={styles.cell} data-type={item.status}>
								<h6>Status</h6>
								<h3>{item.status}</h3>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TransactionTable;
