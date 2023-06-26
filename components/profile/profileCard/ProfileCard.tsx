import { Button, InputField } from "@/shared";
import Image from "next/legacy/image";
import React, { useState } from "react";
import styles from "./ProfileCard.module.scss";

const ProfileCard = () => {
	const [selectedImage, setSelectedImage] = useState<any>(null);
	return (
		<div className={styles.card}>
			<div className={styles.text}>
				<h3>Profile</h3>
			</div>
			<div className={styles.center}>
				<div className={styles.icon}>
					<Image
						src={selectedImage ? selectedImage : "/svgs/profile-avatar.svg"}
						layout="fill"
						alt=""
					/>
					<div className={styles.small_icon_container}>
						<div className={styles.small_icon}>
							<Image src={"/svgs/camera.svg"} layout="fill" alt="" />
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
			<InputField label="User Name" placeholder="John Doe" />
			<Button className={styles.button} buttonType="transparent">
				Save Changes
			</Button>
		</div>
	);
};

export default ProfileCard;
