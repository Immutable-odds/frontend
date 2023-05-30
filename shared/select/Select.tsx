import { Button } from "@/shared";
import React, { useState, useEffect, useCallback } from "react";
import styles from "./Select.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { InputField } from "@/shared";
// import { chains } from '@/mock';
import SmallLoader from "@/shared/loaders/smallLoader/SmallLoader";
import { useGlobalContext } from "@/contexts/AppContext";

export interface OptionProps {
	label: string;
	icon: string;
}

export interface SelectProps {
	options?: any[];
	onOptionChange?: (option?: any) => void;
	defaultOptionIndex?: number;
	className?: string;
	iconClass?: string;
	icon?: string;
	title?: string;
	isTransparent?: boolean;
}

const Select: React.FunctionComponent<SelectProps> = ({
	options,
	onOptionChange,
	defaultOptionIndex = 0,
	className,
	iconClass,
	icon,
	title,
	isTransparent = false,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedOptionIndex, setSelectedOptionIndex] =
		useState<number>(defaultOptionIndex);

	const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
		setIsOpen(!isOpen);
		event.stopPropagation();
	};

	const onOptionClicked = (selectedIndex: number) => () => {
		setSelectedOptionIndex(selectedIndex);
		setIsOpen(false);

		if (onOptionChange) {
			onOptionChange(options![selectedIndex]);
		}
	};

	useEffect(() => {
		const handleClickOutside = () => {
			setIsOpen(false);
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div className={`${styles.select} ${className}`} data-type={isTransparent}>
			{!options ? (
				<SmallLoader />
			) : (
				<div
					className={styles.select_header}
					//buttonType="transparent"
					onClick={toggling}
				>
					<div className={styles.select_smallRow}>
						<div className={styles.flex}>
							{icon && (
								<div className={`${styles.icon} ${iconClass}`}>
									<Image src={icon} layout="fill" alt="" />
								</div>
							)}
							<p>
								{title ? title + ":" : ""}{" "}
								<span>{options![selectedOptionIndex]}</span>
							</p>
						</div>
						<div className={`${styles.select_dropDownImage}`}>
							<Image src="/svgs/chevron.svg" layout="fill" alt="" />
						</div>
					</div>
				</div>
			)}

			{isOpen && (
				<div className={styles.select_body}>
					{/* <InputField /> */}
					<ul className={styles.select_listContainer}>
						{options!.map((option, index) =>
							index !== selectedOptionIndex ? (
								<li
									onClick={onOptionClicked(index)}
									key={index}
									className={styles.select_listItem}
								>
									<div
										//buttonType="transparent"
										className={styles.select_row}
									>
										<p>{option}</p>
									</div>
								</li>
							) : null
						)}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Select;
