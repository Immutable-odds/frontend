import React, { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../button/Button";
import styles from "./ConnectWallet.module.scss";
import { useWeb3React } from "@web3-react/core";
import { useGlobalContext } from "@/contexts/AppContext";
import { connectors } from "@/config/connectors";
import ConnectWalletModal from "../modals/connectWallet/ConnectWalletModal";
import Image from "next/image";
import { truncateAddress } from "@/utils/truncateAddress";
import { createProfile } from "@/services/API";
import { StoreActionType, useStore } from "@/contexts/StoreContext";

const ConnectWallet = () => {
	const { account, activate, deactivate } = useWeb3React();
	const [showConnectWallet, setShowConnectWallet] = useState<boolean>(false);
	const { connectorName, setConnectorName } = useGlobalContext();
	const [userData, setUserData] = useStore();

	const walletIcon = useMemo(
		() => (connectorName || account ? `/svgs/${connectorName}.svg` : null),
		[connectorName]
	);

	const onClickConnectWalletBtn = useCallback(
		(e: any) => {
			if (account) {
				deactivate();
				setConnectorName("");
			} else {
				setShowConnectWallet(true);
				e.stopPropagation();
			}
		},
		[account, setShowConnectWallet]
	);

	useEffect(() => {
		const registerUser = async (account: string) => {
			const response = await createProfile(account);
			setUserData({
				type: StoreActionType.SetStoreData,
				payload: {
					...userData,
					username: response?.result?.username,
					uuid: response?.result?.uuid,
					walletAddress: response?.result?.walletAddress,
				},
			});
		};

		if (account && userData?.walletAddress !== account) registerUser(account);
	}, [account, userData?.uuid]);

	useEffect(() => {
		try {
			const provider = window.localStorage.getItem("provider");
			if (provider) {
				activate(connectors[provider]);
				setConnectorName(provider.toLowerCase());
			}
		} catch (error) {
			console.log(error);
		}
	}, [activate]);

	return (
		<>
			<Button className={styles.button} onClick={onClickConnectWalletBtn}>
				{walletIcon && (
					<div className={styles.icon}>
						<Image src={walletIcon} fill alt="" />
					</div>
				)}

				<p className={styles.text}>
					{account ? truncateAddress(account) : "Connect Wallet"}
				</p>
			</Button>
			{showConnectWallet && (
				<ConnectWalletModal
					openModal={showConnectWallet}
					setOpenModal={setShowConnectWallet}
				/>
			)}
		</>
	);
};

export default ConnectWallet;
