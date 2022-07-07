import { useState } from "react";
import { NavLink } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Icon from "@material-tailwind/react/Icon";
import H6 from "@material-tailwind/react/Heading6";
import { routes } from "routes/routes";
import { useSelector } from "react-redux";

export default function Sidebar({ children }) {
	const [showSidebar, setShowSidebar] = useState("-left-64");

	const isMasterAdmin = useSelector(
		(state) => state.authentication.user?.role
	);

	return (
		<>
			<AdminNavbar
				showSidebar={showSidebar}
				setShowSidebar={setShowSidebar}
			/>
			<div
				className={`h-screen fixed top-0 2xl:left-0  ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
			>
				<div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
					<a
						href="#"
						className="mt-2 text-center w-full inline-block"
					>
						<H6 color="gray">Theo dõi văn bản</H6>
					</a>
					<div className="flex flex-col">
						<hr className="my-4 min-w-full" />

						<ul
							className="flex-col min-w-full flex list-none"
							onClick={() => setShowSidebar("-left-64")}
						>
							{routes.map(
								({ path, displayName, id, exact, icon }) => (
									<li className="rounded-lg mb-2" key={id}>
										<NavLink
											exact={exact}
											to={path}
											className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
											activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
										>
											<Icon name={icon} size="2xl" />
											{displayName}
										</NavLink>
									</li>
								)
							)}
							{isMasterAdmin === "master_admin" && (
								<NavLink
									exact
									to="/quan-li-tai-khoan"
									className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
									activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
								>
									<Icon name="group" size="2xl" />
									Quản lý tài khoản
								</NavLink>
							)}
						</ul>
					</div>
				</div>
			</div>
			<div className="2xl:ml-64">{children}</div>
		</>
	);
}
