import React from "react";
import styles from "./PreLoader.module.scss";

const PreLoader: React.FC = () => {
	return (
		<div className={styles.preloader}>
			<div className={styles.loader}></div>
		</div>
	);
};

export default PreLoader;
