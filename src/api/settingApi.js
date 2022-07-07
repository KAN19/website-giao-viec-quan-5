import axiosClient from "./axiosClient";

const url = "settings";

const settingApi = {
	getEnums: (data) => {
		const subUrl = "/all-enums";
		return axiosClient.get(url + subUrl);
	},
};

export default settingApi;
