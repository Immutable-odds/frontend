import React from "react";
import styles from "./Button.module.scss";

import Image from "next/image";

interface Props extends React.HTMLProps<HTMLButtonElement> {
	buttonType?: "primary" | "transparent";
	children: React.ReactNode;
	iconPrefix?: string;
	iconSuffix?: string;
	className?: string;
	disabled?: boolean;
	onClick?: (event?: any) => void;
}

const Button = ({
	buttonType = "primary",
	children,
	onClick,
	className,
	iconPrefix,
	iconSuffix,
	disabled = false,
}: Props) => {
	return (
		<button
			onClick={onClick}
			className={`${styles[buttonType]} ${className} ${styles.button}`}
			data-type={buttonType}
			disabled={disabled}
		>
			{!!iconPrefix && (
				<figure className={styles.button_icon}>
					<Image src={iconPrefix} fill sizes="100vw" alt="" />
				</figure>
			)}
			{children}
			{!!iconSuffix && (
				<figure className={styles.button_icon}>
					<Image src={iconSuffix} fill sizes="100vw" alt="" />
				</figure>
			)}
		</button>
	);
};

export default Button;
