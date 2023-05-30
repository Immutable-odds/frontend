// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { id },
	} = req;
	try {
		const response = await fetch(
			`${"https://api.football-data.org/v4/competitions"}/${id}/matches`,
			{
				headers: {
					"X-Auth-Token": "2a721d1268bb42728ff42f269eca46c6",
				},
			}
		);
		const data = await response.json();

		res.status(200).json({ data: data, success: true });
	} catch (error) {
		res.status(409).json({ success: false });
	}
}
