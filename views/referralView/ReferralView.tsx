import React, { useEffect, useState } from "react";
import styles from "./ReferralView.module.scss";
import {
	GiftTitle,
	ReferralCard,
	ReferralDescription,
	ReferralDetails,
} from "@/components/referral";
import { Button } from "@/shared";
import { useStore } from "@/contexts/StoreContext";
import { fetchUserInvites } from "@/services/API";

enum MobileView {
	REFERRAL_LINK = "REFERRAL_LINK",
	FRIENDS_REFERRED = "FRIENDS_REFERRED",
}

const ReferralView = () => {
	const [view, setView] = useState<MobileView>(MobileView.REFERRAL_LINK);
	const [userData] = useStore()
	const [referralData, setReferralData] = useState<{
		referralId: string;
		totalInvited: number,
		earnings: number;
		invites: string[]
	}>(null)

	useEffect(() => {
		const loadData = async (uuid) => {
			const data = await fetchUserInvites(uuid)
			setReferralData(data?.result);
		}
		if (userData?.uuid)  loadData(userData.uuid)
	}, [userData])

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
					<ReferralDetails referralData={referralData} />
					<ReferralDescription />
				</>
			)}
			<div className={styles.show_desktop}>
				<ReferralCard invites={referralData?.invites ?? []} />
			</div>
			{view === MobileView.FRIENDS_REFERRED && (
				<div className={styles.show_mob}>
					<ReferralCard invites={referralData?.invites ?? []} />
				</div>
			)}
		</section>
	);
};

export default ReferralView;
