import React from "react";
import styles from "./ReferralView.module.scss";
import Image from "next/image";
import {
	GiftTitle,
	ReferralCard,
	ReferralDescription,
	ReferralDetails,
} from "@/components/referral";

const user = {
	invitedRefs: 30,
	refEarnings: 120,
	pendingRefs: 90,
	referral: "KKjdLkk",
};

const ReferralView = () => {
	return (
		<section className={styles.section}>
			<GiftTitle />
			<ReferralDetails user={user} />
			<ReferralDescription />
			<ReferralCard />
		</section>
	);
};

export default ReferralView;
