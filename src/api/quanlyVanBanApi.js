import axiosClient from "./axiosClient";

const url = "van_ban";

const quanlyVanBanApi = {
	getVanBan: (params) => {
		const subUrl = "/all";
		return axiosClient.get(url + subUrl, { params: params });
	},
	createVanBan: (data) => {
		const subUrl = "/create";
		return axiosClient.post(url + subUrl, data);
	},
	updateVanBan: (data, id) => {
		const subUrl = `/${id}`;
		return axiosClient.patch(url + subUrl, data);
	},
	deleteVanBan: (id) => {
		const subUrl = `/${id}`;
		return axiosClient.delete(url + subUrl);
	},
	getVanBanById: (id) => {
		const subUrl = `/${id}`;
		return axiosClient.get(url + subUrl);
	},
};

export default quanlyVanBanApi;
