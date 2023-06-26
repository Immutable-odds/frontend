export interface Matches {
	league: string;
	homeTeam: string;
	awayTeam: string;
	homeTeamSlug: string;
	awayTeamSlug: string;
	time: number;
	homeTeamIcon: string;
	awayTeamIcon: string;
	odds: {
		winOdds: number;
		lossOdds: number;
		drawOdds: number;
	};
}

export interface CryptoBet {
	id: number;
	token1: string;
	token2?: string;
	icon1: string;
	icon2?: string;
	network: string;
	betCondition: string;
	betType: string;
	apy: {
		agree: number;
		disagree: number;
	};
	timeStamp: number;
}

export interface SelectOption {
	label: string;
	value: string;
	icon?: string;
}
