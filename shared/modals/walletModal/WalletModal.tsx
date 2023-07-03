import Button from "@/shared/button/Button";
import InputField from "@/shared/inputField/InputField";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import styles from "./WalletModal.module.scss";

interface Props {
	setOpenModal: (e?: any) => void;
	openModal: boolean;
}

const WalletModal = ({ setOpenModal, openModal }: Props) => {
	const [emailAddress, setEmailAddress] = useState<string>("");
	useEffect(() => {
		const handleClickOutside = () => {
			setOpenModal(false);
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [setOpenModal]);
	return (
		<div className={styles.modal} data-active={openModal}>
			<div className={styles.container} onClick={(e: any) => e.stopPropagation()}>
				<div
					className={styles.closeModal_container}
					onClick={() => setOpenModal(false)}
				>
					<div className={styles.closeModal}>
						<span></span>
						<span></span>
					</div>
				</div>
				<div className={styles.body_container}>
					<div className={styles.block}>
						<div className={styles.text}>
							<h3>Get Started</h3>
							<p>
								Select your preferred means of getting into the platform
								to kickstart your betting experience
							</p>
						</div>
					</div>
					<InputField
						label="Email"
						placeholder="Enter Email Address"
						onChange={(e: any) => setEmailAddress(e.target.value)}
					/>
					<div className={styles.horizontal_rule}>
						<span>Or</span>
					</div>
					<div className={styles.button_container}>
						<Button className={styles.button} buttonType="transparent">
							<div className={styles.icon}>
								<Image
									src="/svgs/wallet-connect.svg"
									layout="fill"
									alt=""
								/>
							</div>
							<div className={styles.text}>
								<h3>Wallet Connect</h3>
								<p>Connect with your Trust wallet</p>
							</div>
						</Button>
						<Button className={styles.button} buttonType="transparent">
							<div className={styles.icon}>
								<Image src="/svgs/metamask.svg" layout="fill" alt="" />
							</div>
							<div className={styles.text}>
								<h3>Metamask</h3>
								<p>Connect with your Metamask</p>
							</div>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WalletModal;
