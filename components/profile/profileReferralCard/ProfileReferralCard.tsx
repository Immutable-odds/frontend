import React from "react";
import styles from "./ProfileReferralCard.module.scss";
import { Icon } from "@/shared";

const ProfileReferralCard = ({ referrals }) => {
	return (
		<div className={styles.card}>
			<div className={styles.text}>
				<h3>Friends Referred</h3>
			</div>
			<div className={styles.body}>
				{referrals?.length ? referrals.map((referral: string, index: number) => (
					<div key={index} className={styles.small_card}>
						<div className={styles.row}>
							<div className={styles.icon}>
								<Icon className={styles.icon_container} />
							</div>
							<div className={styles.text}>
								<p>{referral}</p>
							</div>
						</div>
						{/* <div className={styles.status} data-type={referral.status}>
							<p>{referral.status}</p>
						</div> */}
					</div>
				)) : (
					<div className={styles.center}>
						<div className={styles.block}>
							<div className={styles.text}>
								<p>You have not invited any friend.</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfileReferralCard;
