import TongQuanPage from "pages/TongQuan";
import QuanLyVanBan from "pages/QuanLyVanBan";
import QuanLyDonVi from "pages/QuanLyDonVi";
import QuanLyTaiKhoan from "pages/QuanLyTaiKhoan";

export const routes = [
	{
		id: 0,
		displayName: "Tổng quan",
		path: "/",
		exact: true,
		component: TongQuanPage,
		icon: "dashboard",
	},
	{
		id: 1,
		displayName: "Quản lý văn bản",
		path: "/quan-li-van-ban",
		exact: false,
		component: QuanLyVanBan,
		icon: "article",
	},
	{
		id: 2,
		displayName: "Quản lý đơn vị",
		path: "/quan-li-don-vi",
		exact: false,
		component: QuanLyDonVi,
		icon: "contacts",
	},
	// {
	// 	id: 3,
	// 	displayName: "Quản lý tài khoản",
	// 	path: "/quan-li-tai-khoan",
	// 	exact: false,
	// 	component: QuanLyTaiKhoan,
	// 	icon: "",
	// },
];
