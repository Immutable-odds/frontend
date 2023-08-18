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
	const [walletBalance, setWalletBalance] = useState<number>(200000);
	const [connectorName, setConnectorName] = useState<string>('')

	return (
		<AppContext.Provider
			value={{
				connectorName,
				setConnectorName,
				stakeSlip,
				setStakeSlip,
				reRender,
				setReRender,
				walletBalance,
				setWalletBalance,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
