import Image from "next/image";
import React from "react";
import styles from "./Icon.module.scss";

interface Props {
	src?: string;
	className?: string;
	title?: string;
	quality?: number;
	priority?: boolean;
}

const Icon = ({ src, className, quality, priority, title = "" }: Props) => {
	return (
		<>
			{src ? (
				<div className={`${styles.icon} ${className && className}`}>
					<Image
						src={src}
						alt={title}
						title={title}
						quality={quality}
						fill
						priority={priority}
						sizes="100vw"
					/>
				</div>
			) : (
				<div className={`${styles.container} ${className && className}`}>
					<div
						className={`${!src && styles.icon_not} ${className && className}`}
					>
						<Image
							src={"/svgs/icon-immutable.svg"}
							alt={title}
							title={title}
							quality={quality}
							fill
							priority={priority}
							sizes="100vw"
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default Icon;
