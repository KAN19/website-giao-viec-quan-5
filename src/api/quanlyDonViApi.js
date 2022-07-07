import axiosClient from "./axiosClient";

const url = "don_vi";

const quanlyDonViApi = {
	getAllDonVi: (data) => {
		const subUrl = "/all";
		return axiosClient.get(url + subUrl);
	},
	createDonVi: (data) => {
		const subUrl = "/create";
		return axiosClient.post(url + subUrl, data);
	},
	updateDonVi: (data, id) => {
		const subUrl = `/${id}`;
		return axiosClient.patch(url + subUrl, data);
	},
	deleteDonVi: (id) => {
		const subUrl = `/${id}`;
		return axiosClient.delete(url + subUrl);
	},
};

export default quanlyDonViApi;
