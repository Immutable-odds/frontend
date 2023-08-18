import { useRouter } from "next/router";
import React from "react";
import Button from "../button/Button";
import styles from "./ButtonNav.module.scss";

const ButtonNav = () => {
	const router = useRouter();
	const checkActive = (url: string) => {
		let isActive = url === router.asPath;
		if (
			url === "/football" &&
			[
				"/brazil",
				"/england",
				"/europe",
				"/spain",
				"/france",
				"/germany",
				"/italy",
				"/netherlands",
				"/portugal",
			].some(partialUrl => router.asPath.includes(`/football${partialUrl}`))
		)
			isActive = true;

		return isActive;
	};
	return (
		<div className={styles.container}>
			<Button
				buttonType="transparent"
				className={styles.button_container}
				onClick={() => {
					router.push("/");
				}}
			>
				<div className={styles.button} data-active={checkActive("/")}>
					Crypto Bets
				</div>
			</Button>
			<Button
				buttonType="transparent"
				className={styles.button_container}
				onClick={() => {
					router.push("/football");
				}}
			>
				<div className={styles.button} data-active={checkActive("/football")}>
					Football Bets
				</div>
			</Button>
		</div>
	);
};

export default ButtonNav;
