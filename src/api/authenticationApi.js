import axiosClient from "./axiosClient";

const authenticationApi = {
	login: (data) => {
		const url = "auth/login";
		return axiosClient.post(url, data);
	},
};

export default authenticationApi;
