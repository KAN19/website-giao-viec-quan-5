import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	accessToken: "",
	expiresIn: "",
};

export const authenticationSlice = createSlice({
	name: "authentication",
	initialState,
	reducers: {
		saveUserData: (state, action) => {
			const { user, token } = action.payload;
			state.user = user;
			state.accessToken = token;
		},
		removeUserData: (state) => {
			state.user = null;
			state.accessToken = "";
			localStorage.clear("token");
		},
	},
});

// Action creators are generated for each case reducer function
export const { saveUserData, removeUserData } = authenticationSlice.actions;

export const userSelector = (state) => state.authentication.user;

export default authenticationSlice.reducer;
