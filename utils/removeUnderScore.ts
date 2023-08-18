const removeUnderScore = (item: string) => {
	if (item.includes("_")) {
		const splitData = item.split("_");
		const joinData = splitData.join(" ");
		return joinData;
	}
	return item;
};

export default removeUnderScore;
