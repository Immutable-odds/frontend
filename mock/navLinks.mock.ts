interface NavLink {
	title: string;
	url: string;
	external: boolean;
	id: number;
}

export const navLinks: NavLink[] = [
	{
		id: 1,
		title: "dashboard",
		url: "/",
		external: false,
	},
	{
		id: 2,
		title: "profile",
		url: "/settings",
		external: false,
	},
];
