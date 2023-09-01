import Image from "next/image";
import styles from "./ReferralCard.module.scss";
import { referrals } from "@/mock";
import { Icon } from "@/shared";

const ReferralCard = ({ invites }) => {
	return (
		<div className={styles.card}>
			<div className={styles.text}>
				<h3>Referrals</h3>
			</div>
			<div className={styles.body}>
				{invites?.length ? invites.map((referral: string, index: number) => (
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

export default ReferralCard;
