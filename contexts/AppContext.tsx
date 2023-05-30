import React, { useState, useEffect, useContext, createContext } from "react";

interface Active {
	slippageActive: number;
	gasActive: number;
}
// export interface Props {
// 	collapseMobHeader?: boolean;
// 	setCollapseMobHeader?: (collapseMobheader: boolean) => void;
// 	expandSidebar: boolean;
// 	setExpandSidebar: (expandSidebar: boolean) => void;
// }

const AppContext = createContext<any>(null);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [stakeSlip, setStakeSlip] = useState<any[]>([]);
	const [reRender, setReRender] = useState<boolean>(false);

	return (
		<AppContext.Provider value={{ stakeSlip, setStakeSlip, reRender, setReRender }}>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
