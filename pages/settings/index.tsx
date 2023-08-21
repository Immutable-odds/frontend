import React from "react";
import type { ReactElement } from "react";
import { useRouter } from "next/router";
import { PreLoader } from "@/shared/loaders";

const Settings = (): ReactElement => {
	const router = useRouter();
	router.replace("/settings/profile");
	return <PreLoader />;
};

export default Settings;
