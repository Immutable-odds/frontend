import React from "react";
import styles from "./ReferralDescription.module.scss";
import Image from "next/image";

const ReferralDescription = () => {
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				<h2>How it works</h2>
			</div>
			<div className={styles.row}>
				<div className={styles.icon}>
					<Image
						src="/svgs/icon-desc-share.svg"
						alt="share"
						fill
						sizes="100vw"
					/>
				</div>
				<div className={styles.text}>
					<h4>Share your referral link</h4>
					<p>
						Invite your friends to join Immutable odds using your unique
						referral link.
					</p>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.icon}>
					<Image src="/svgs/icon-desc-bet.svg" alt="share" fill sizes="100vw" />
				</div>
				<div className={styles.text}>
					<h4>Your Friends Make Bets</h4>
					<p>
						Your friends get $10 off their first bet when they connect their
						wallet or sign up.
					</p>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.icon}>
					<Image
						src="/svgs/icon-desc-reward.svg"
						alt="share"
						fill
						sizes="100vw"
					/>
				</div>
				<div className={styles.text}>
					<h4>Earn Reward</h4>
					<p>
						You receive your own $10 after your friend’s bet time has
						successfully elapsed.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ReferralDescription;
