import { profileNav } from "@/mock";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./ProfileNavModal.module.scss";

interface Props {
	setOpenModal: (e?: any) => void;
	openModal: boolean;
}

const ProfileNavModal = ({ openModal, setOpenModal }: Props) => {
	const router = useRouter();
	const checkActive = (url: string) => {
		let isActive = url === router.asPath;
		return isActive;
	};
	return (
		<div className={styles.modal} data-active={openModal}>
			<div className={styles.container}>
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
			</div>
		</div>
	);
};

export default ProfileNavModal;
