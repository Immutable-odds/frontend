import Image from "next/image";
import React from "react";
import styles from "./GiftTitle.module.scss";

const GiftTitle = () => {
	return (
		<div className={styles.gift_block}>
			<div className={styles.icon}>
				<Image src="/svgs/icon-gift.svg" alt="gift" fill sizes="100vw" />
			</div>
			<div className={styles.text}>
				<h1>Get $10 with the click of a button</h1>
				<p>
					Get rewarded when your friend joins Immutable! You both will each
					receive $10 when your friend completes a successful stake on any
					betting type
				</p>
			</div>
		</div>
	);
};

export default GiftTitle;
