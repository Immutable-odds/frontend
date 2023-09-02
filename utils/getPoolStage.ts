export const getPoolStage = (bet) => {
	let poolStage: 'open' | 'vesting' | 'closed' = "open"
	const betEnds = new Date(bet?.poolData?.duration).getTime()
	const poolEnds = new Date(bet?.poolData?.stakeDuration).getTime()
	const timeNow = Date.now()

	if (betEnds <= timeNow && poolEnds > timeNow){
		poolStage = "vesting";
	} else if (timeNow >= poolEnds) poolStage = "closed"

	return poolStage
}