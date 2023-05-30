import "@/styles/index.scss";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Nprogress, Seo } from "@/shared";
import { MainLayout } from "@/layout";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "@/contexts/AppContext";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	useEffect(() => {
		const load = setTimeout(() => setIsLoading(false), 2000);
		return () => {
			clearTimeout(load);
		};
	}, []);
	return (
		<AppProvider>
			<Seo />
			<Nprogress />
			{!isLoading ? (
				<React.Fragment>
					<Component {...pageProps} />
				</React.Fragment>
			) : // <PreLoader />
			null}
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</AppProvider>
	);
}
