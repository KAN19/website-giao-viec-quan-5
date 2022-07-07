// Tailwind CSS Style Sheet
import "assets/styles/tailwind.css";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import EditVanBanDon from "pages/EditVanBanDon";
import EditVanBanHanhChinh from "pages/EditVanBanHanhChinh";
import Login from "pages/Login";
import QuanLyDonVi from "pages/QuanLyDonVi";
import QuanLyTaiKhoan from "pages/QuanLyTaiKhoan";
import QuanLyVanBan from "pages/QuanLyVanBan";
import TongQuanPage from "pages/TongQuan";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchVanBanEnums } from "redux/quan-ly-van-ban/quanlyVanBanSlice";
import PrivateRoute, { PrivateRouteMaster } from "routes/PrivateRoute";
import "./App.css";
function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchVanBanEnums());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Switch>
				<Route component={Login} path="/login" />
				<Switch>
					<Sidebar>
						<PrivateRoute path="/" exact>
							<TongQuanPage />
						</PrivateRoute>

						<PrivateRoute path="/quan-li-van-ban" exact>
							<QuanLyVanBan />
						</PrivateRoute>

						<PrivateRoute path="/quan-li-van-ban/don/" exact>
							<EditVanBanDon />
						</PrivateRoute>

						<PrivateRoute path="/quan-li-van-ban/don/:id">
							<EditVanBanDon />
						</PrivateRoute>

						<PrivateRoute path="/quan-li-van-ban/hanh-chinh/" exact>
							<EditVanBanHanhChinh />
						</PrivateRoute>

						<PrivateRoute path="/quan-li-van-ban/hanh-chinh/:id">
							<EditVanBanHanhChinh />
						</PrivateRoute>

						<PrivateRoute path="/quan-li-don-vi">
							<QuanLyDonVi />
						</PrivateRoute>

						<PrivateRouteMaster path="/quan-li-tai-khoan">
							<QuanLyTaiKhoan />
						</PrivateRouteMaster>

						{/* <Redirect to="/" /> */}
						<Footer />

						<ToastContainer
							position="top-right"
							autoClose={3000}
							hideProgressBar={true}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss={false}
							draggable
							pauseOnHover={false}
							transition={Slide}
						/>
					</Sidebar>
				</Switch>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
