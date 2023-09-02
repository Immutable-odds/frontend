import { useCopy } from "@/hooks";
import { networks, tokens } from "@/mock";
import { AdvanceSelect, Button } from "@/shared";
import { ModalLoader } from "@/shared/loaders";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./CryptoDepositModal.module.scss";

interface Props {
	setOpenModal: (e?: any) => void;
	openModal: boolean;
}

enum Status {
	IDLE = "IDLE",
	LOADING = "LOADING",
	SUCCESS = "SUCCESS",
}

const CryptoDepositModal = ({ setOpenModal, openModal }: Props) => {
	const router = useRouter();
	const [depositDetails, setDepositDetails] = useState<{
		token: string;
		network: string;
		tokenAddress: string;
	}>({ token: "", network: "", tokenAddress: "" });
	const [status, setStatus] = useState<Status>(Status.IDLE);
	const handleCopy = useCopy();
	useEffect(() => {
		const handleClickOutside = () => {
			setOpenModal(false);
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [setOpenModal]);

	// useEffect(() => {
	// 	if (depositDetails.token && depositDetails.network) {
	// 		setDepositDetails((d) => ({
	// 			...d,
	// 			tokenAddress: "122t3t3yui88whuwueu738ueu738",
	// 		}));
	// 	}
	// }, [depositDetails.token, depositDetails.network]);
	const handleTokenSelect = (option: any) => {
		setDepositDetails(depositDetail => ({
			...depositDetail,
			token: option.token,
		}));
	};
	const handleNetworkSelect = (option: any) => {
		setDepositDetails(depositDetail => ({
			...depositDetail,
			network: option.network,
		}));
	};
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
							<div className={styles.text}>
								<h3>Pay with Crypto</h3>
								<p>
									Select any of our acceptable stable coins to fund your
									wallet
								</p>
							</div>
							<div className={styles.body}>
								<div className={styles.block}>
									<div className={styles.text}>
										<h6>Payment Token</h6>
									</div>
									<AdvanceSelect
										options={tokenList()}
										className={styles.select}
										onOptionChange={handleTokenSelect}
										defaultOption="Select a token"
										objectOption="token"
										object={depositDetails}
									/>
								</div>
								<div className={styles.block}>
									<div className={styles.text}>
										<h6>Network</h6>
									</div>
									<AdvanceSelect
										options={networks}
										className={styles.select}
										onOptionChange={handleNetworkSelect}
										defaultOption="Select a network"
										objectOption="network"
										object={depositDetails}
									/>
								</div>
								{depositDetails.tokenAddress && (
									<div className={styles.block}>
										<div className={styles.text}>
											<h6>Copy Address</h6>
										</div>
										<div className={styles.copy_container}>
											<div className={styles.text}>
												<h5>{depositDetails.tokenAddress}</h5>
											</div>
											<div
												className={styles.copy}
												onClick={() =>
													handleCopy(
														depositDetails.tokenAddress
													)
												}
											>
												<Image
													src="/svgs/icon-copy.svg"
													fill
													sizes="100vw"
													alt=""
												/>
											</div>
										</div>
									</div>
								)}
								{depositDetails.token && depositDetails.network && (
									<Button
										className={styles.button}
										onClick={handleSubmit}
									>
										I have made payment
									</Button>
								)}
							</div>
						</div>
						<div className={styles.center}>
							<div className={styles.center_block}>
								{depositDetails.tokenAddress ? (
									<>
										<div className={styles.qr_text}>
											<h5>
												After selecting your Token, the QR code
												for sending funds would be displayed here
											</h5>
										</div>
										<div className={styles.qr_code}>
											<Image
												src="/svgs/qr-code.svg"
												fill
												sizes="100vw"
												alt=""
											/>
										</div>
									</>
								) : (
									<>
										<div className={styles.qr_description}>
											<Image
												src="/svgs/qr-description.svg"
												fill
												sizes="100vw"
												alt=""
											/>
										</div>

										<div className={styles.center_text}>
											<h5>
												After selecting your Token, the QR code
												for sending funds would be displayed here
											</h5>
										</div>
									</>
								)}
							</div>
						</div>
					</>
				)}
				{status === Status.LOADING && (
					<div className={styles.center}>
						<div className={styles.center_block}>
							<div className={styles.loading_icon}>
								<Image
									src="/svgs/icon-loading.svg"
									fill
									sizes="100vw"
									alt=""
								/>
							</div>
							<div className={styles.loading_text}>
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
							<div className={styles.loading_text}>
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

export default CryptoDepositModal;
