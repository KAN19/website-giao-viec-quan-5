import axios from "axios";
import axiosClient from "./axiosClient";

const url = "statistic";

const tongQuanApi = {
	getTongQuan: (params) => {
		const subUrl = "/overall";
		return axiosClient.get(url + subUrl, { params: params });
	},

	getStatisticFile: (params) => {
		const subUrl = "/export-excel";
		const token = localStorage.getItem("token");
		return axios.get(url + subUrl, {
			responseType: "blob",
			baseURL: process.env.REACT_APP_BASE_URL,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
};

export default tongQuanApi;
