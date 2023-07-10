import { useCopy } from "@/hooks";
import { networks, tokens } from "@/mock";
import { AdvanceSelect, Button } from "@/shared";
import { ModalLoader } from "@/shared/loaders";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import styles from "./WithdrawModal.module.scss";

interface Props {
	setOpenModal: (e?: any) => void;
	openModal: boolean;
}

enum Status {
	IDLE = "IDLE",
	LOADING = "LOADING",
	SUCCESS = "SUCCESS",
}

const WithdrawModal = ({ setOpenModal, openModal }: Props) => {
	const router = useRouter();
	const [status, setStatus] = useState<Status>(Status.IDLE);
	useEffect(() => {
		const handleClickOutside = () => {
			setOpenModal(false);
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [setOpenModal]);
	useEffect(() => {
		if (status === Status.LOADING) {
			const timeout = setTimeout(() => {
				setStatus(Status.SUCCESS);
			}, 5000);
			return () => clearTimeout(timeout);
		}
	}, [status]);
	const tokenList = () => {
		return tokens.map(token => {
			return {
				label: token.label,
				value: token.value,
				icon: `/svgs/tokens/${token.label.toLowerCase()}.svg`,
			};
		});
	};
	const handleSubmit = () => {
		setStatus(Status.LOADING);
	};

	return (
		<div className={styles.modal} data-active={openModal}>
			<div
				className={styles.container}
				onClick={(e: any) => e.stopPropagation()}
				data-type={status}
			>
				<div
					className={styles.closeModal_container}
					onClick={() => setOpenModal(false)}
				>
					<div className={styles.closeModal}>
						<span></span>
						<span></span>
					</div>
				</div>
				{status === Status.IDLE && (
					<>
						<div className={styles.body_container}>
							<div className={styles.body}>
								<div className={styles.text}>
									<h3>Pay with Crypto</h3>
									<p>
										Select any of our acceptable stable coins to fund
										your wallet
									</p>
								</div>
							</div>
						</div>
					</>
				)}
				{status === Status.LOADING && (
					<div className={styles.center}>
						<div className={styles.center_block}>
							<div className={styles.status_icon} data-type="rotate">
								<Image
									src="/svgs/icon-loading.svg"
									layout="fill"
									alt=""
								/>
							</div>
							<div className={styles.status_text}>
								<h3>Confirming Payment</h3>
								<p>
									Payment confirmation takes up to 5min. While we are
									waiting for your payment to reflect in our wallet,
									feel free explore other betting activities.{" "}
								</p>
							</div>
							<Button
								className={styles.button}
								onClick={() => router.push("/settings")}
							>
								Go to Dashboard
							</Button>
							<div className={styles.status_text}>
								<Link href="/settings/transactions">
									View Transaction
								</Link>
							</div>
						</div>
					</div>
				)}
				{status === Status.SUCCESS && (
					<div className={styles.center}>
						<div className={styles.center_block}>
							<div className={styles.status_icon}>
								<Image
									src="/svgs/icon-success.svg"
									layout="fill"
									alt=""
								/>
							</div>
							<div className={styles.status_text}>
								<h3>Payment Successful</h3>
								<p>
									Your payment has been successfully confirmed, you can
									use your new wallet balance to make any bets or
									predictions on the platform
								</p>
							</div>
							<Button
								className={styles.button}
								onClick={() => router.push("/settings")}
							>
								Go to Dashboard
							</Button>
							<div className={styles.status_text}>
								<Link href="/settings/transactions">
									View Transaction
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default WithdrawModal;
