import { useGlobalContext } from "@/contexts/AppContext";
import React, { useMemo, useState } from "react";
import Button from "../button/Button";
import styles from "./OddsCard.module.scss";

interface Props {
	winOdds: number;
	lossOdds: number;
	drawOdds: number;
	showTitle?: boolean;
	className?: string;
	data?: any;
	type?: "crypto" | "football";
}

const OddsCard = ({
	winOdds,
	lossOdds,
	drawOdds,
	showTitle = false,
	className,
	data,
	type = "football",
}: Props) => {
	const { stakeSlip, setStakeSlip, setReRender, reRender }: any = useGlobalContext();
	const [activeNumber, setActiveNumber] = useState<number>(0);
	const localMatch = stakeSlip;

	const formattedMatch = {
		...data,
	};
	const handleClick = (odd: number, stake: string, activeNumber: number) => {
		if (type === "crypto") {
			if (stake === "win") stake = "i agree";
			if (stake === "lose") stake = "i don't Agree";
		}

		const formattedMatch = {
			...data,
			stake,
			odd,
		};

		const index =
			localMatch.length !== 0
				? localMatch.findIndex(
						(obj: any) => obj?.poolData?.id === formattedMatch?.poolData?.id
				  )
				: 0;

		if (index !== -1) {
			// Object already exists, replace it
			localMatch[index] = formattedMatch;
		} else {
			// Object doesn't exist, add it
			localMatch.push(formattedMatch);
		}
		setActiveNumber(activeNumber);
		setReRender((reRender: boolean) => !reRender);
		setStakeSlip(localMatch);
	};

	const isFoundInSlip = useMemo(() => {
		return (apy: number) => {
			const index = localMatch.findIndex(
				obj => obj?.poolData?.id === formattedMatch?.poolData?.id
			);
			const isApyType = localMatch.some(match => match.odd === apy);

			if (index !== -1 && isApyType) {
				// Object already exists, replace it
				return true;
			}
			return false;
		};
	}, [localMatch, formattedMatch]);

	const isDisabled = formattedMatch.poolData.status === "vesting";

	return (
		<div className={`${styles.container} ${className}`} data-type={type}>
			<Button
				buttonType="transparent"
				onClick={() => handleClick(winOdds, "win", 1)}
				className={styles.button}
				disabled={isDisabled}
			>
				<div data-active={isFoundInSlip(winOdds)} className={styles.box}>
					<div className={styles.text}>
						{showTitle && <p>HW</p>}
						<h3>{winOdds}</h3>
					</div>
				</div>
			</Button>
			{type !== "crypto" && (
				<Button
					buttonType="transparent"
					onClick={() => handleClick(drawOdds, "draw", 2)}
					className={styles.button}
					disabled={isDisabled}
				>
					<div data-active={isFoundInSlip(drawOdds)} className={styles.box}>
						<div className={styles.text}>
							{showTitle && <p>D</p>}
							<h3>{drawOdds}</h3>
						</div>
					</div>
				</Button>
			)}
			<Button
				buttonType="transparent"
				onClick={() => handleClick(lossOdds, "lose", 3)}
				className={styles.button}
				disabled={isDisabled}
			>
				<div data-active={isFoundInSlip(lossOdds)} className={styles.box}>
					<div className={styles.text}>
						{showTitle && <p>AW</p>}
						<h3>{lossOdds}</h3>
					</div>
				</div>
			</Button>
		</div>
	);
};

export default OddsCard;
