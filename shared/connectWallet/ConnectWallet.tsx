import React from "react";
import Button from "../button/Button";
// import { useWeb3React } from "@web3-react/core";
import styles from "./ConnectWallet.module.scss";

const ConnectWallet = () => {
	// const { account } = useWeb3React();
	return <Button className={styles.button}>ConnectWallet</Button>;
};

export default ConnectWallet;
