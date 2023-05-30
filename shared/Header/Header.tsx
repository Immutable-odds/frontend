// import { navLinks } from '@/mock'
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Logo, Button } from "@/shared";
import styles from "./Header.module.scss";
import { scrollTo } from "@/utils";
import Image from "next/legacy/image";
import { navLinks } from "@/mock";

const Header = () => {
	const router = useRouter();
	const [scroll, setScroll] = useState<boolean>(false);
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [dropDown, setDropDown] = useState<boolean>(false);
	const ref = useRef<any>(null);
	const handleNavClick = (id: string) => {
		scrollTo({ id });
		setCollapsed(true);
	};

	const toggling = (event: React.MouseEvent) => {
		setDropDown(!dropDown);
		event.stopPropagation();
	};

	// useEffect(() => {
	// 	const element = ref.current;
	// 	const navList =
	// 		element?.children[0].children[1].children[0].children[0].childNodes;
	// 	if (typeof document !== "undefined") {
	// 		const sections = document.querySelectorAll("section");
	// 		const navLi = document.querySelectorAll("li");
	// 		window.onscroll = () => {
	// 			let current: any = "";

	// 			sections.forEach(section => {
	// 				const sectionTop = section.offsetTop;
	// 				if (scrollY >= sectionTop - 150) {
	// 					current = section.getAttribute("id");
	// 				}
	// 			});

	// 			navList?.forEach((li: any) => {
	// 				// console.log(current)
	// 				// if (scrollY == 0) {
	// 				//   if (li.classList.contains('home')) {
	// 				//     li.classList.add('active-nav')
	// 				//   }
	// 				// }else{

	// 				// }
	// 				li.classList.remove("active-nav");
	// 				if (li.classList.contains(current)) {
	// 					li.classList.add("active-nav");
	// 				}
	// 			});
	// 		};
	// 		// console.log(navList)
	// 	}
	// }, []);

	useEffect(() => {
		const handleClickOutside = () => {
			setDropDown(false);
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);
	return (
		<header
			className={`${styles.header} ${scroll ? styles.header_scrolled : ""}`}
			ref={ref}
		>
			<div className={styles.header_container}>
				<Link href="/">
					<div
						className={styles.header_logoContainer}
						onClick={() => setCollapsed(true)}
					>
						<Logo />
					</div>
				</Link>
				<div
					className={
						styles[
							!collapsed ? "header_wrapper" : "header_wrapper__collapsed"
						]
					}
				>
					<nav className={styles.header_nav}>
						{/* <ul className={styles.header_navList}>
							{navLinks.map(({ title, external, url }, index) => {
								return (
									<li
										key={index}
										className={`${styles.header_navLink} ${title}`}
										onClick={() => handleNavClick(title)}
									>
										{external ? (
											<a
												href={url}
												rel="noreferrer"
												target="_blank"
											>
												{title}
											</a>
										) : (
											<Link href="/">{title}</Link>
										)}
									</li>
								);
							})}
						</ul> */}
					</nav>
				</div>
				<div></div>
				<div
					onClick={() => setCollapsed(!collapsed)}
					className={
						styles[collapsed ? "header_hamburger" : "header_hamburger__open"]
					}
				>
					<span className={styles.header_hamburgerBar}></span>
					<span className={styles.header_hamburgerBar}></span>
				</div>
			</div>
		</header>
	);
};

export default Header;
