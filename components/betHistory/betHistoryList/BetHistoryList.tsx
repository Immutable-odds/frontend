import React from "react";
import BetHistoryCard from "../betHistoryCard/BetHistoryCard";

const BetHistoryList = ({ data }: any) => {
	return (
		<div>
			{data.map((bet: any) => (
				<BetHistoryCard bet={bet} key={bet.id} />
			))}
		</div>
	);
};

export default BetHistoryList;
