import Image from "next/image";
import React, { useState } from "react";
import CryptoDepositModal from "../cryptoDepositModal/CryptoDepositModal";
import styles from "./CryptoDepositCard.module.scss";

const CryptoDepositCard = () => {
	const [showModal, setShowModal] = useState<boolean>(false);
	return (
		<>
			<div
				className={styles.card}
				onClick={(e: any) => {
					setShowModal(true);
					e.stopPropagation();
				}}
			>
				<div className={styles.icon}>
					<Image src="/svgs/icon-crypto.svg" fill sizes="100vw" alt="" />
				</div>
				<div className={styles.text}>
					<h3>Pay With Crypto</h3>
					<p>All tokens Acceptable</p>
				</div>
			</div>
			<CryptoDepositModal openModal={showModal} setOpenModal={setShowModal} />
		</>
	);
};

export default CryptoDepositCard;
