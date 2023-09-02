import { profileNav } from "@/mock";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./ProfileSider.module.scss";

const ProfileSider = () => {
	const router = useRouter();
	const checkActive = (url: string) => {
		let isActive = url === router.asPath;
		return isActive;
	};
	return (
		<div className={styles.container}>
			<div className={styles.block}>
				<div className={styles.title}>
					<h3>Profile</h3>
				</div>
			</div>
			{profileNav.map((nav: any, index: number) => (
				<div className={styles.block} key={index}>
					<Link href={nav.url}>
						<div className={styles.row} data-active={checkActive(nav.url)}>
							<div className={styles.icon}>
								<Image src={nav.icon} fill sizes="100vw" alt="" />
							</div>
							<div className={styles.text}>
								<p>{nav.title}</p>
							</div>
						</div>
					</Link>
				</div>
			))}
		</div>
	);
};

export default ProfileSider;
