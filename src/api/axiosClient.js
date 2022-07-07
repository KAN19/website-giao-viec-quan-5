import axios from "axios";
import queryString from "query-string";
import { toast } from "react-toastify";

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:3000/api/quan5",
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	(error) => {
		if (error.response.statusText === "Unauthorized") {
			alert("Token hết hạn. Vui lòng đăng nhập lại");

			const link = document.createElement("a");
			link.href = "/login";
			link.click();
			localStorage.clear();
		}
		throw error;
	}
);

export default axiosClient;
