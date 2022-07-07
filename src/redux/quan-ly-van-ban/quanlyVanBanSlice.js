import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import quanlyVanBanApi from "api/quanlyVanBanApi";
import settingApi from "api/settingApi";
import { toast } from "react-toastify";

const initialState = {
	LoaiDon: null,
	LoaiVanBan: null,
	TinhTrangXuLyVanBanDon: null,
	TinhTrangXuLyVanBanHanhChinh: null,
};

export const getAllVanBan = createAsyncThunk(
	"quan-ly-van-ban/get-all-van-ban",
	async (params, thunkAPI) => {
		try {
			const response = await quanlyVanBanApi.getVanBan(params);
			return response;
		} catch (error) {
			// console.log(error);
		}
	}
);

export const fetchVanBanEnums = createAsyncThunk(
	"quan-ly-van-ban/fetch-enums",
	async (thunkAPI) => {
		const response = await settingApi.getEnums();
		return response;
	}
);

export const createVanBan = createAsyncThunk(
	"quan-ly-van-ban/create-van-ban",
	async (data, thunkAPI) => {
		try {
			const response = await quanlyVanBanApi.createVanBan(data);
			toast.success("Tạo văn bản thành công!");

			return response;
		} catch (error) {
			toast.warning("Có lỗi xảy ra, vui lòng thử lại!");
		}
	}
);

export const updateVanBan = createAsyncThunk(
	"quan-ly-van-ban/update-van-ban",
	async (values, thunkAPI) => {
		try {
			const response = await quanlyVanBanApi.updateVanBan(
				values?.data,
				values?.id
			);
			toast.success("Cập nhật văn bản thành công!");

			return response;
		} catch (error) {
			toast.warning("Có lỗi xảy ra, vui lòng thử lại!");
		}
	}
);

export const deleteVanBan = createAsyncThunk(
	"quan-ly-van-ban/delete-van-ban",
	async (values, thunkAPI) => {
		const response = await quanlyVanBanApi.deleteVanBan(values?.id);
		toast.success("Xóa văn bản thành công!");
		return response;
	}
);

export const getVanBanByID = createAsyncThunk(
	"quan-ly-van-ban/get-van-ban-by-id",
	async (values, thunkAPI) => {
		const response = await quanlyVanBanApi.getVanBanById(values?.id);
		return response;
	}
);

// Store enums
export const quanlyVanBanSlice = createSlice({
	name: "quan-ly-van-ban",
	initialState,
	// reducers: {
	// 	saveAllEnums: (state, action) => {},
	// },
	extraReducers: (builder) => {
		builder.addCase(fetchVanBanEnums.fulfilled, (state, action) => {
			const {
				LoaiDon,
				LoaiVanBan,
				TinhTrangXuLyVanBanDon,
				TinhTrangXuLyVanBanHanhChinh,
			} = action.payload.Quan5Enums;
			state.LoaiDon = LoaiDon;
			state.LoaiVanBan = LoaiVanBan;
			state.TinhTrangXuLyVanBanDon = TinhTrangXuLyVanBanDon;
			state.TinhTrangXuLyVanBanHanhChinh = TinhTrangXuLyVanBanHanhChinh;
		});
	},
});

// Action creators are generated for each case reducer function
// export const { saveAllEnums } = quanlyVanBanSlice.quanlyVanBan;

export default quanlyVanBanSlice.reducer;
