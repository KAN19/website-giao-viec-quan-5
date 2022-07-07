import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import quanlyDonViApi from "api/quanlyDonViApi";
import tongQuanApi from "api/tongQuanApi";

const initialState = {};

export const getTongQuan = createAsyncThunk(
	"tong-quan/get-tong-quan",
	async (values, thunkAPI) => {
		try {
			const response = await tongQuanApi.getTongQuan(values);
			console.log(response);
			return response;
		} catch (error) {
			console.log(error);
		}
	}
);

export const getStatisticFile = createAsyncThunk(
	"tong-quan/get-file-thong-ke",
	async (values, thunkAPI) => {
		try {
			const res = await tongQuanApi.getStatisticFile(values);

			const url = window.URL.createObjectURL(new Blob([res.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "report.xlsx");
			document.body.appendChild(link);
			link.click();

			// console.log(response);
			return res;
		} catch (error) {
			console.log(error);
		}
	}
);

// Store enums
export const tongQuanSlice = createSlice({
	name: "tong-quan",
	initialState,
	// reducers: {
	// 	saveAllEnums: (state, action) => {},
	// },
});

// Action creators are generated for each case reducer function
// export const { saveAllEnums } = quanlyVanBanSlice.quanlyVanBan;

export default tongQuanSlice.reducer;
