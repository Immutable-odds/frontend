import React from "react";
import type { ReactElement } from "react";
import { ProfileLayout } from "@/layout";
import { ReferralView } from "@/views";
import { useWeb3React } from "@web3-react/core";
import { ConnectWallet } from "@/shared";

const Referral = (): ReactElement => {
	const { account } = useWeb3React();
	return (
		<ProfileLayout>
			{/* {!account ? (
				<div
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
						marginTop: "25%",
					}}
				>
					<ConnectWallet />
				</div>
			) : ( */}
			<ReferralView />
			{/* )} */}
		</ProfileLayout>
	);
};

export default Referral;
