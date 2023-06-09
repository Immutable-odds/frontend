import React, { ReactNode, ReactElement } from "react";
import styles from "./ProfileLayout.module.scss";

import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Header, Footer, Preloader } from "@/shared";
import { ProfileSider } from "@/components/profile";

interface Props {
	children: ReactNode;
	page?: string;
}

const ProfileLayout = ({ children, page }: Props): ReactElement => {
	return (
		<>
			{/* <Preloader /> */}
			<div className={styles.layout}>
				<Header />
				<div className={styles.layout_row}>
					<ProfileSider />
					<main className={styles.layout_content}>{children}</main>
				</div>
				{/* <Footer /> */}
			</div>
		</>
	);
};

export default ProfileLayout;
