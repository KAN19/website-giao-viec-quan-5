import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import quanlyDonViApi from "api/quanlyDonViApi";
import { toast } from "react-toastify";

const initialState = {};

export const getAllDonVi = createAsyncThunk(
	"quan-ly-don-vi/get-don-vi",
	async (values, thunkAPI) => {
		const response = await quanlyDonViApi.getAllDonVi();
		const data = response.filter((item) => item.isDeleted === false);
		return data.reverse();
	}
);

export const createDonVi = createAsyncThunk(
	"quan-ly-don-vi/create-don-vi",
	async (values, thunkAPI) => {
		console.log(values);
		try {
			console.log(values);
			const response = await quanlyDonViApi.createDonVi(values?.data);
			toast.success("Tạo đơn vị thành công!");
			return response;
		} catch (error) {
			console.log(error);
		}
	}
);

export const updateDonVi = createAsyncThunk(
	"quan-ly-don-vi/update-don-vi",
	async (values, thunkAPI) => {
		try {
			const response = await quanlyDonViApi.updateDonVi(
				values?.data,
				values?.id
			);
			toast.success("Cập nhật đơn vị thành công!");
			return response;
		} catch (error) {
			console.log(error);
		}
	}
);

export const deleteDonVi = createAsyncThunk(
	"quan-ly-don-vi/delete-don-vi",
	async (values, thunkAPI) => {
		try {
			const response = await quanlyDonViApi.deleteDonVi(values?.id);
			toast.success("Xóa đơn vị thành công!");

			return response;
		} catch (error) {
			console.log(error);
			toast.error("Xóa thất bại vì đơn vị này đang được sử dụng");
		}
	}
);

// Store enums
export const quanlyDonViSlice = createSlice({
	name: "quan-ly-don-vi",
	initialState,
	// reducers: {
	// 	saveAllEnums: (state, action) => {},
	// },
});

// Action creators are generated for each case reducer function
// export const { saveAllEnums } = quanlyVanBanSlice.quanlyVanBan;

export default quanlyDonViSlice.reducer;
