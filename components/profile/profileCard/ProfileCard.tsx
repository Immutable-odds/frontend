import { Button, InputField } from "@/shared";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./ProfileCard.module.scss";
import { updateUsername } from "@/services/API";
import { useWeb3React } from "@web3-react/core";
import { StoreActionType, useStore } from "@/contexts/StoreContext";

const ProfileCard = () => {
	const { account } = useWeb3React();
	const [userData, setUserData] = useStore();
	const [selectedImage, setSelectedImage] = useState<any>(null);
	const [username, setUsername] = useState<string>("");

	const updateUsernameBtn = async () => {
		if (username) {
			const data = await updateUsername({
				walletAddress: account,
				username,
			});
			setUserData({
				type: StoreActionType.SetStoreData,
				payload: {
					...userData,
					username: data?.result?.username,
					uuid: data?.result?.uuid,
					walletAddress: data?.result?.walletAddress,
				},
			});
		}
	};

	return (
		<div className={styles.card}>
			<div className={styles.text}>
				<h3>Profile</h3>
			</div>
			<div className={styles.center}>
				<div className={styles.icon}>
					<Image
						src={selectedImage ? selectedImage : "/svgs/profile-avatar.svg"}
						fill
						sizes="100vw"
						alt=""
					/>
					<div className={styles.small_icon_container}>
						<div className={styles.small_icon}>
							<Image src={"/svgs/camera.svg"} fill sizes="100vw" alt="" />
							<input
								type="file"
								// name="file"
								className={styles.file_input}
								// onChange={async (event: any) => {
								// 	const url = await uploadFile(event);
								// 	if (url) {
								// 		setSelectedImage({ loading: false, file: url });
								// 	} else {
								// 		setSelectedImage({ loading: false, file: null });
								// 	}
								// }}
								// onChange={handleChange}
								// {...register("avatar")}
							/>
						</div>
					</div>
				</div>
			</div>
			<InputField
				label="User Name"
				placeholder={userData?.username}
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>
			<Button
				className={styles.button}
				buttonType="transparent"
				onClick={updateUsernameBtn}
			>
				Save Changes
			</Button>
		</div>
	);
};

export default ProfileCard;
