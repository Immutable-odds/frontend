import React, { useState } from "react";
import Button from "../button/Button";
import { WalletModal } from "../modals";
// import { useWeb3React } from "@web3-react/core";
import styles from "./ConnectWallet.module.scss";

const ConnectWallet = () => {
	// const { account } = useWeb3React();
	const [openModal, setOpenModal] = useState<boolean>(false);
	return (
		<>
			<Button className={styles.button} onClick={() => setOpenModal(true)}>
				ConnectWallet
			</Button>
			<WalletModal openModal={openModal} setOpenModal={setOpenModal} />
		</>
	);
};

export default ConnectWallet;
