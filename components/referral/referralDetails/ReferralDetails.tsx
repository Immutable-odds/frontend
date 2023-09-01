import React from "react";
import styles from "./ReferralDetails.module.scss";
import Image from "next/image";
import { formatNum, truncateHash } from "@/utils";
import { useCopy } from "@/hooks";
import { APP_URL } from "@/config";

const ReferralDetails = ({ referralData }) => {
	const handleCopy = useCopy();
	const refLink = `${APP_URL}?ref=${referralData?.referralId}`

	const referralMessage = `Hey! Use my referral code: ${referralData?.referralId} to get started.`;

	const openInstagram = () => {
		const url = `https://www.instagram.com/?message=${encodeURIComponent(
			referralMessage
		)}`;
		window.open(url, "_blank");
	};

	const openFacebook = () => {
		const url = `https://www.facebook.com/sharer/sharer.php?u=&quote=${encodeURIComponent(
			referralMessage
		)}`;
		window.open(url, "_blank");
	};

	const openTwitter = () => {
		const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
			referralMessage
		)}`;
		window.open(url, "_blank");
	};

	const openLinkedIn = () => {
		const url = `https://www.linkedin.com/shareArticle?mini=true&url=&title=&summary=&source=&text=${encodeURIComponent(
			referralMessage
		)}`;
		window.open(url, "_blank");
	};
	return (
		<div className={styles.container}>
			<div className={styles.title_container}>
				<div className={styles.text}>
					<h5>Invited</h5>
					<h3>{referralData?.totalInvited ? formatNum(referralData.totalInvited) : '-'}</h3>
				</div>
				<div className={styles.text}>
					<h5>Earnings</h5>
					<h1>{referralData?.earnings ? formatNum(referralData.earnings) : '-'}</h1>
				</div>
				{/* <div className={styles.text}>
					<h5>Pending</h5>
					<h3>{formatNum(0)}</h3>
				</div> */}
			</div>
			<div className={styles.body_container}>
				<div className={styles.text}>
					<h2>Referral Link</h2>
				</div>
				<div className={styles.small_container}>
					<div className={styles.text}>
						<h4>{refLink} </h4>
					</div>
					<div className={styles.icon} onClick={() => handleCopy(refLink)}>
						<Image src="/svgs/icon-copy.svg" alt="copy" fill sizes="100vw" />
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles.card} onClick={openFacebook}>
						<div className={styles.icon}>
							<Image
								src="/svgs/icon-facebook.svg"
								alt="copy"
								fill
								sizes="100vw"
							/>
						</div>
						<div className={styles.text}>
							<h5>Facebook</h5>
						</div>
					</div>
					<div className={styles.card} onClick={openTwitter}>
						<div className={styles.icon}>
							<Image
								src="/svgs/icon-twitter.svg"
								alt="copy"
								fill
								sizes="100vw"
							/>
						</div>
						<div className={styles.text}>
							<h5>Twitter</h5>
						</div>
					</div>
					<div className={styles.card} onClick={openInstagram}>
						<div className={styles.icon}>
							<Image
								src="/svgs/icon-instagram.svg"
								alt="copy"
								fill
								sizes="100vw"
							/>
						</div>
						<div className={styles.text}>
							<h5>Instagram</h5>
						</div>
					</div>
					<div className={styles.card} onClick={openLinkedIn}>
						<div className={styles.icon}>
							<Image
								src="/svgs/icon-linkedin.svg"
								alt="copy"
								fill
								sizes="100vw"
							/>
						</div>
						<div className={styles.text}>
							<h5>Linkedin</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReferralDetails;
