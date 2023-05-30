import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import InputField from "../inputField/InputField";
import styles from "./SearchBox.module.scss";

interface Props {
	placeholder?: string;
	className?: string;
	options?: any;
	onOptionChange?: (e?: any) => void;
	onClick?: (e?: any) => void;
}

const SearchBox = ({
	placeholder = "Search Team or League",
	className,
	onOptionChange,
	onClick,
}: Props) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const router = useRouter();

	return (
		<div className={`${styles.searchBox} ${className}`} onClick={onClick}>
			<InputField
				icon="/svgs/icon-search.svg"
				onChange={e => onOptionChange!(e.target.value)}
				placeholder={placeholder}
				className={styles.input}
			/>
		</div>
	);
};

export default SearchBox;
