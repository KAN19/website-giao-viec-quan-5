export const totalItemsPerPage = 10;

export const editHanhChinh_ValidationRules = {
	tenVanBan: [{ required: true, message: "Vui lòng nhập Tên văn bản/ Trích yếu văn bản" }],
	ngayBatDau: [{ required: true, message: "Vui lòng chọn ngày bắt đầu" }],
	thoiHan: [{ required: true, message: "Vui lòng chọn thời hạn" }],
	tinhTrang: [{ required: true, message: "Vui lòng chọn tình trạng xử lý" }],
	ngayBanHanh: [{ required: true, message: "Vui lòng chọn ngày ban hành" }],
	donVi: [{ required: true, message: "Vui lòng chọn đơn vị" }],
};

export const editVanBanDon_ValidationRules = {
	tenVanBan: [{ required: true, message: "Vui lòng nhập Tên văn bản/ Trích yếu văn bản" }],
	loaiDon: [{ required: true, message: "Vui lòng chọn loại đơn" }],
	ngayNhanDon: [{ required: true, message: "Vui lòng ngày nhận đơn" }],
	tenNguoiGui: [{ required: true, message: "Vui lòng nhập tên người gửi" }],
	thoiHan: [{ required: true, message: "Vui lòng chọn thời hạn" }],
	tinhTrangXuLy: [
		{ required: true, message: "Vui lòng chọn tình trạng xử lý" },
	],
	donVi: [{ required: true, message: "Vui lòng chọn đơn vị" }],
};
