export const formatMatches = (matches: any[]) => {
	const groupedMatches: {[key: string]: {area: any, icon: string, leagues: any[]}} = {};

	matches.forEach((match: any) => {
		const areaName = match.area.name;
		if (!groupedMatches[areaName]) {
			groupedMatches[areaName] = {
				area: match.area,
				icon: match.competition.emblem,
				leagues: [],
			};
		}

		const leagueName = match.competition.name;
		const leagueMatches = groupedMatches[areaName].leagues.find(
			(leagueItem: any) => leagueItem.league === leagueName
		);

		if (leagueMatches) {
			leagueMatches.matches.push(match);
		} else {
			groupedMatches[areaName].leagues.push({
				league: leagueName,
				icon: match.competition.emblem,
				id: match.competition.id,
				matches: [match],
			});
		}
	});

	// Convert the grouped matches object to an array
	
	const matchList = Object.values(groupedMatches)
	return matchList;
};

export const formatCompetitons = (competitions: any[]) => {
	const groupedData: any = {};
	competitions.forEach(item => {
		const areaId = item.area.id;
		if (!groupedData[areaId]) {
			groupedData[areaId] = {
				area: item.area,
				leagues: [],
			};
		}
		groupedData[areaId].leagues.push({
			league: item.name,
			info: {
				id: item.id,
				code: item.code,
				type: item.type,
				icon: item.emblem,
				plan: item.plan,
				currentSeason: item.currentSeason,
				numberOfAvailableSeasons: item.numberOfAvailableSeasons,
				lastUpdated: item.lastUpdated,
			}, // You can add matches here if available
		});
	});
	const reformattedData = Object.values(groupedData);
	return reformattedData;
};
