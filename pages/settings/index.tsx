import React from "react";
import type { ReactElement } from "react";
import { ProfileLayout } from "@/layout";
import { ProfileView } from "@/views";

const Profile = (): ReactElement => {
	return (
		<ProfileLayout>
			<ProfileView />
		</ProfileLayout>
	);
};

export default Profile;
