import React, { useState, useEffect, useCallback } from "react";
import styles from "./CountDown.module.scss";

interface CountdownProps {
	epochTime: number;
}

interface TimeLeft {
	years: number;
	months: number;
	weeks: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ epochTime }) => {
	const calculateTimeLeft = useCallback((): TimeLeft => {
		const currentTime = new Date().getTime();
		const difference = epochTime * 1000 - currentTime;

		if (difference <= 0) {
			// Countdown is finished
			return {
				years: 0,
				months: 0,
				weeks: 0,
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
			};
		}

		const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
		const months = Math.floor(
			(difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
		);
		const weeks = Math.floor(
			(difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24 * 7)
		);
		const days = Math.floor(
			(difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
		);
		const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((difference % (1000 * 60)) / 1000);

		return { years, months, weeks, days, hours, minutes, seconds };
	}, [epochTime]);
	const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [calculateTimeLeft]);

	if (
		timeLeft.years === 0 &&
		timeLeft.months === 0 &&
		timeLeft.weeks === 0 &&
		timeLeft.days === 0 &&
		timeLeft.hours === 0 &&
		timeLeft.minutes === 0 &&
		timeLeft.seconds === 0
	) {
		return (
			<div className={styles.text}>
				<p>Finished</p>
			</div>
		);
	}

	return (
		<div className={styles.text}>
			<p>
				{timeLeft.years > 0 ? `${timeLeft.years}Y: ` : ""}
				{timeLeft.months > 0 ? `${timeLeft.months}M: ` : ""}
				{timeLeft.weeks > 0 ? `${timeLeft.weeks}W: ` : ""}
				{timeLeft.days > 0 ? `${timeLeft.days}D: ` : ""}
				{timeLeft.hours > 0 ? `${timeLeft.hours}h: ` : ""}
				{timeLeft.minutes}m: {timeLeft.seconds}s
			</p>
		</div>
	);
};

export default Countdown;
