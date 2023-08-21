import React, { useState } from "react";
import styles from "./ReferralView.module.scss";
import Image from "next/image";
import {
	GiftTitle,
	ReferralCard,
	ReferralDescription,
	ReferralDetails,
} from "@/components/referral";
import { Button } from "@/shared";

const user = {
	invitedRefs: 30,
	refEarnings: 120,
	pendingRefs: 90,
	referral: "KKjdLkk",
};

enum MobileView {
	REFERRAL_LINK = "REFERRAL_LINK",
	FRIENDS_REFERRED = "FRIENDS_REFERRED",
}

const ReferralView = () => {
	const [view, setView] = useState<MobileView>(MobileView.REFERRAL_LINK);
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<Button
					buttonType="transparent"
					className={styles.button_container}
					onClick={() => setView(MobileView.REFERRAL_LINK)}
				>
					<div
						className={styles.button}
						data-active={view === MobileView.REFERRAL_LINK}
					>
						Referral Link
					</div>
				</Button>
				<Button
					buttonType="transparent"
					className={styles.button_container}
					onClick={() => setView(MobileView.FRIENDS_REFERRED)}
				>
					<div
						className={styles.button}
						data-active={view === MobileView.FRIENDS_REFERRED}
					>
						Friends Referred
					</div>
				</Button>
			</div>
			{view === MobileView.REFERRAL_LINK && (
				<>
					<GiftTitle />
					<ReferralDetails user={user} />
					<ReferralDescription />
				</>
			)}
			<div className={styles.show_desktop}>
				<ReferralCard />
			</div>
			{view === MobileView.FRIENDS_REFERRED && (
				<div className={styles.show_mob}>
					<ReferralCard />
				</div>
			)}
		</section>
	);
};

export default ReferralView;
