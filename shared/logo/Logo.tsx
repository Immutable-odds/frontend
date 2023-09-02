import styles from "./Logo.module.scss";
import React from "react";
import Image from "next/image";

interface Props {
	type?: "footer" | "default";
}

const Logo = ({ type }: Props) => {
	return (
		<div className={styles.logo}>
			<Image
				src={"/svgs/logo.svg"}
				loading="eager"
				priority={true}
				alt="fusion xperience"
				fill
				quality={100}
				sizes="100vw"
			/>
		</div>
	);
};

export default Logo;
