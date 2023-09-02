import { ProgressBar } from "@/shared";
import { formatNum } from "@/utils";
import Image from "next/image";
import React from "react";
import styles from "./DashboardPointsCard.module.scss";

interface CardProps {
	icon?: string;
	points?: number;
	level?: string;
	progressPerc?: number;
}

const DashboardPointsCard = ({
	icon,
	points = 1000,
	level = "bronze",
	progressPerc = 50,
}: CardProps) => {
	return (
		<div className={styles.card}>
			<div className={styles.icon}>
				<Image
					src={icon ? icon : "/svgs/icon-bronze.svg"}
					fill
					sizes="100vw"
					alt=""
				/>
			</div>
			<div className={styles.block}>
				<div className={styles.text}>
					<h3>{formatNum(points, false, 2)} Points</h3>
				</div>
				<ProgressBar percent={progressPerc} className={styles.progress} />
				<div className={styles.row}>
					<div className={styles.text}>
						<p>
							current: <span>{level}</span>
						</p>
					</div>
					<div className={styles.text}>
						<p>
							next:{" "}
							{/* asbract this logic to a function: getNextLevel()  */}
							<span>
								{level === "bronze"
									? "silver"
									: level === "silver"
									? "gold"
									: ""}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardPointsCard;
