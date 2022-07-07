import Button from "@material-tailwind/react/Button";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import Icon from "@material-tailwind/react/Icon";
import Image from "@material-tailwind/react/Image";
import ProfilePicture from "assets/img/avatar.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { removeUserData } from "redux/authentication/authenticationSlice";

export default function AdminNavbar({ showSidebar, setShowSidebar }) {
	const location = useLocation().pathname;

	const dispatch = useDispatch();

	const history = useHistory();

	const [headerTitle, setHeaderTitle] = useState("");

	const handleLogout = () => {
		dispatch(removeUserData());
		history.push("/login");
	};

	useEffect(() => {
		if (location) {
			if (location === "/") {
				setHeaderTitle("Tổng quan");
			} else if (location.includes("quan-li-van-ban")) {
				setHeaderTitle("Quản lý văn bản");
			} else if (location.includes("quan-li-don-vi")) {
				setHeaderTitle("Quản lý đơn vị");
			} else if (location.includes("quan-li-tai-khoan")) {
				setHeaderTitle("Quản lý tài khoản");
			}
		}
	}, [location]);

	return (
		<nav
			className={` 2xl:ml-64 py-6 px-3 bg-login-background bg-cover bg-center transition-all duration-300`}
		>
			<div className="container max-w-full mx-auto flex items-center justify-between lg:pr-8 lg:pl-10">
				<div className="2xl:hidden">
					<Button
						color="transparent"
						buttonType="link"
						size="lg"
						iconOnly
						rounded
						ripple="light"
						onClick={() => setShowSidebar("left-0")}
					>
						<Icon name="menu" size="2xl" color="white" />
					</Button>
					<div
						className={`absolute top-2  ${
							showSidebar === "left-0" ? "left-64" : "-left-64"
						} z-50 transition-all duration-300`}
					>
						<Button
							color="transparent"
							buttonType="link"
							size="lg"
							iconOnly
							rounded
							ripple="light"
							onClick={() => setShowSidebar("-left-64")}
						>
							<Icon name="close" size="2xl" color="white" />
						</Button>
					</div>
				</div>

				<div className="flex justify-between items-center w-full">
					<h4 className="uppercase text-white text-sm tracking-wider mt-1">
						{headerTitle}
					</h4>

					<div className="flex">
						<div className="-mr-4 ml-6">
							<Dropdown
								color="transparent"
								buttonText={
									<div className="w-10 h-10 object-cover">
										<Image src={ProfilePicture} rounded />
									</div>
								}
								rounded
								style={{
									padding: 0,
									color: "transparent",
								}}
							>
								<DropdownItem
									color="lightBlue"
									onClick={handleLogout}
								>
									Logout
								</DropdownItem>
							</Dropdown>
						</div>
					</div>
				</div>
			</div>
			<div className="pt-10 pb-28 px-3 md:px-8 h-auto "></div>
		</nav>
	);
}
