import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import quanLyTaiKhoanApi from "api/quanlyTaiKhoanApi";
import { toast } from "react-toastify";

const initialState = {};

export const getAllTaiKhoan = createAsyncThunk(
	"quan-ly-tai-khoan/get-tai-khoan",
	async (values, thunkAPI) => {
		const response = await quanLyTaiKhoanApi.getAllTaiKhoan();
		const data = response.filter((item) => item.isDeleted === false);
		return data.reverse();
	}
);

export const deleteTaiKhoan = createAsyncThunk(
	"quan-ly-tai-khoan/delete-tai-khoan",
	async (values, thunkAPI) => {
		// console.log("call api", values);
		const response = await quanLyTaiKhoanApi.deleteTaiKhoan(values?.id);
		toast.success("Xóa tài khoản thành công!");

		return response;
	}
);

export const createTaiKhoan = createAsyncThunk(
	"quan-ly-tai-khoan/create-tai-khoan",
	async (values, thunkAPI) => {
		try {
			const response = await quanLyTaiKhoanApi.createTaiKhoan(
				values?.data
			);
			toast.success("Tạo tài khoản thành công!");

			return response;
		} catch (error) {
			toast.error(
				"Tạo tài khoản thất bại. Vui lòng kiểm tra lại thông tin!"
			);
		}
	}
);

export const updateTaiKhoan = createAsyncThunk(
	"quan-ly-tai-khoan/update-tai-khoan",
	async (values, thunkAPI) => {
		const response = await quanLyTaiKhoanApi.updateTaiKhoan(
			values?.data,
			values?.id
		);
		toast.success("Cập nhật tài khoản thành công!");

		return response;
	}
);

// Store enums
export const quanlyTaiKhoanSlice = createSlice({
	name: "quan-ly-tai-khoan",
	initialState,
	// reducers: {
	// 	saveAllEnums: (state, action) => {},
	// },
});

// Action creators are generated for each case reducer function
// export const { saveAllEnums } = quanlyVanBanSlice.quanlyVanBan;

export default quanlyTaiKhoanSlice.reducer;
