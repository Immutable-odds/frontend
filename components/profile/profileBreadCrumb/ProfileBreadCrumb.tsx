import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ProfileNavModal from "../profileNavModal/ProfileNavModal";
import styles from "./ProfileBreadCrumb.module.scss";

const ProfileBreadCrumb = () => {
	const router = useRouter();
	const splitPathname = router.pathname.split("/");
	const clickableLink = splitPathname[2];
	const checkHyphen = (pathname: string) => pathname.replaceAll("-", " ");

	const [openModal, setOpenModal] = useState<boolean>(false);
	return (
		<div className={styles.breadcrumb} onClick={() => setOpenModal(true)}>
			<div className={styles.text}>
				<p>Settings</p>
			</div>
			<div className={styles.chevron}>
				<Image src="/svgs/chevron.svg" alt="" fill />
			</div>
			<div className={styles.text}>
				<h4>{checkHyphen(clickableLink)}</h4>
			</div>
			<ProfileNavModal openModal={openModal} setOpenModal={setOpenModal} />
		</div>
	);
};

export default ProfileBreadCrumb;
