import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./BreadCrumb.module.scss";

const BreadCrumb = ({ page }: any) => {
	const router = useRouter();
	const path = router.asPath.split("/");
	const path2 = router.asPath.split("/");
	path2.pop();
	path2.shift();

	return (
		<div className={styles.breadcrumb}>
			<div className={styles.text}>
				<span>{path2[1]} / </span>
			</div>
			<div className={styles.text}>
				<h6> {page ? page : path.slice(-1)} </h6>
			</div>
		</div>
	);
};

export default BreadCrumb;
