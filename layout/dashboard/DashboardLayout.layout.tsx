import React, { ReactNode, ReactElement } from "react";
import styles from "./DashboardLayout.module.scss";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Header, Footer, Preloader } from "@/shared";
// import Footer from '@/components/footer/Footer'

// import { Button } from "@/shared";

interface Props {
	children: ReactNode;
	page?: string;
}

const DashboardLayout = ({ children, page }: Props): ReactElement => {
	const router = useRouter();

	return (
		<>
			{/* <Preloader /> */}
			<div className={styles.layout}>
				<Header />

				{page === "404" && (
					<div className={styles.layout_breadcrumbs}>
						{/* <Button
            className={styles.layout_breadcrumbsBtn}
            onClick={() => router.push("/")}
            type="transparent"
          >
            <Image src="/svg/arrow-left.svg" width="24" height="24" alt="" />
            <span className={styles.layout_breadcrumbsText}>Back to home</span>
          </Button> */}
					</div>
				)}

				<main className={styles.layout_content}>{children}</main>
				{/* <Footer /> */}
			</div>
		</>
	);
};

export default DashboardLayout;
