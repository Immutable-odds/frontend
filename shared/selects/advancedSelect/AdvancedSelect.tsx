import React, { useState, useEffect } from "react";
import styles from "./AdvancedSelect.module.scss";
import Image from "next/image";
import SmallLoader from "@/shared/loaders/smallLoader/SmallLoader";
import { shortenTitle } from "@/utils";
import { SelectOption } from "@/types";

export interface SelectProps {
	options: SelectOption[];
	onOptionChange: (option?: any) => void;
	object?: any;
	objectOption: any;
	defaultOptionIndex?: number;
	className?: string;
	iconClass?: string;
	icon?: string;
	title?: string;
	isTransparent?: boolean;
	defaultOption?: string;
	valueType?: "value" | "label";
}

const AdvanceSelect: React.FunctionComponent<SelectProps> = ({
	options,
	onOptionChange,
	defaultOptionIndex = -1,
	className,
	iconClass,
	icon,
	title,
	isTransparent = false,
	defaultOption = "Select an Option",
	objectOption,
	object,
	valueType = "value",
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

		onOptionChange({ ...object, [objectOption]: options![selectedIndex][valueType] });
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
				<div className={styles.select_header} onClick={toggling}>
					<div className={styles.select_smallRow}>
						<div className={styles.flex}>
							{selectedOptionIndex === -1
								? null
								: options[selectedOptionIndex].icon && (
										<div className={`${styles.icon} ${iconClass}`}>
											<Image
												src={options[selectedOptionIndex].icon!}
												layout="fill"
												alt=""
											/>
										</div>
								  )}
							<p>
								{title ? title + ":" : ""}{" "}
								<span>
									{selectedOptionIndex === -1
										? defaultOption
										: shortenTitle(
												options![selectedOptionIndex].value,
												42
										  )}
								</span>
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
					<ul className={styles.select_listContainer}>
						{options!.map((option: SelectOption, index) =>
							index !== selectedOptionIndex ? (
								<li
									onClick={onOptionClicked(index)}
									key={index}
									className={styles.select_listItem}
								>
									<div className={styles.select_row}>
										<p>{option.value}</p>
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

export default AdvanceSelect;
