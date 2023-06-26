import { referrals } from "@/mock";
import Image from "next/legacy/image";
import React from "react";
import styles from "./ProfileReferralCard.module.scss";

const ProfileReferralCard = () => {
	return (
		<div className={styles.card}>
			<div className={styles.text}>
				<h3>Friends Referred</h3>
			</div>
			<div className={styles.body}>
				{referrals.map((referral: any, index: number) => (
					<div key={index} className={styles.small_card}>
						<div className={styles.row}>
							<div className={styles.icon}>
								<Image src={referral.icon} layout="fill" alt="" />
							</div>
							<div className={styles.text}>
								<p>{referral.name}</p>
							</div>
						</div>
						<div className={styles.status} data-type={referral.status}>
							<p>{referral.status}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProfileReferralCard;
