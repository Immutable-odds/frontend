import "@/styles/index.scss";
import type { AppProps } from "next/app";
import React, { useState, useEffect } from "react";
import { Nprogress, Seo } from "@/shared";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "@/contexts/AppContext";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";
import { StoreProvider } from "@/contexts/StoreContext";

const getLibrary = (provider) => {
	const library = new ethers.providers.Web3Provider(provider)
	library.pollingInterval = 8000 // frequency provider is polling
	return library
}

export default function App({ Component, pageProps }: AppProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	useEffect(() => {
		const load = setTimeout(() => setIsLoading(false), 2000);
		return () => {
			clearTimeout(load);
		};
	}, []);
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<StoreProvider>
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
			</StoreProvider>
		</Web3ReactProvider>
	);
}
