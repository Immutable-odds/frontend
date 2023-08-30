import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./DashboardBreadcrumb.module.scss";
import Link from "next/link";

const DashboardBreadcrumb = ({}) => {
	const router = useRouter();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const splitPathname = router.pathname.split("/");
	const clickableLink = splitPathname[2];
	const checkHyphen = (pathname: string) => pathname.replaceAll("-", " ");

	return (
		<div className={styles.breadcrumb} onClick={() => setOpenModal(true)}>
			<div className={styles.text}>
				<p>Settings</p>
			</div>
			<div className={styles.chevron}>
				<Image src="/svgs/chevron.svg" alt="" fill sizes="100vw" />
			</div>
			<div className={styles.text}>
				<h4>{checkHyphen(clickableLink)}</h4>
			</div>
			<DashboardNavModal openModal={openModal} setOpenModal={setOpenModal} />
		</div>
	);
};

export default DashboardBreadcrumb;

interface ModalProps {
	openModal: boolean;
	setOpenModal: (value: any) => void;
}

const DashboardNavModal = ({ openModal, setOpenModal }: ModalProps) => {
	const router = useRouter();
	const checkActive = (url: string) => {
		let isActive = url === router.asPath;
		return isActive;
	};
	return (
		<div className={styles.modal} data-active={openModal}>
			{/* <div className={styles.container}>
				{profileNav.map((nav: any, index: number) => (
					<div
						className={styles.block}
						key={index}
						onClick={() => setOpenModal(false)}
					>
						<Link href={nav.url}>
							<div
								className={styles.row}
								data-active={checkActive(nav.url)}
							>
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
			</div> */}
		</div>
	);
};
