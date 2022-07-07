import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./authentication/authenticationSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import quanlyVanBanSlice from "./quan-ly-van-ban/quanlyVanBanSlice";
import quanlyDonViSlice from "./quan-ly-don-vi/quanlyDonViSlice";
import quanLyTaiKhoanSlice from "./quan-ly-tai-khoan/quanLyTaiKhoanSlice";
// import thunk from 'redux-thunk';

export const reducers = combineReducers({
	authentication: authenticationSlice,
	quanlyVanBan: quanlyVanBanSlice,
	quanlyDonVi: quanlyDonViSlice,
	quanLyTaiKhoan: quanLyTaiKhoanSlice,
});

// export default reducers;

// export const store = configureStore({
// 	reducer: {
// 		authentication: authenticationSlice,
// 	},
// });
