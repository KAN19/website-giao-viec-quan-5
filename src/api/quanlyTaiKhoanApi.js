import axiosClient from "./axiosClient";

const url = "admin";

const quanlyDonViApi = {
	getAllTaiKhoan: (data) => {
		const subUrl = "/all";
		return axiosClient.get(url + subUrl);
	},
	createTaiKhoan: (data) => {
		const subUrl = "/create";
		return axiosClient.post(url + subUrl, data);
	},
	updateTaiKhoan: (data, id) => {
		const subUrl = `/${id}`;
		return axiosClient.patch(url + subUrl, data);
	},
	deleteTaiKhoan: (id) => {
		const subUrl = `/${id}`;
		return axiosClient.delete(url + subUrl);
	},
};

export default quanlyDonViApi;
