import { Button, DatePicker, Form, Input, Select } from "antd";
import FormListItems from "components/FormListItems";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllDonVi } from "redux/quan-ly-don-vi/quanlyDonViSlice";
import {
	createVanBan,
	getVanBanByID,
	updateVanBan,
} from "redux/quan-ly-van-ban/quanlyVanBanSlice";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { editVanBanDon_ValidationRules } from "utils/constants";

const { Option } = Select;

function EditVanBanDon(props) {
	let { id } = useParams();

	const dispatch = useDispatch();

	const history = useHistory();

	const loaiDon = useSelector((state) => state.quanlyVanBan.LoaiDon);
	const tinhTrangXuLy = useSelector(
		(state) => state.quanlyVanBan.TinhTrangXuLyVanBanDon
	);

	const [listDonVi, setListDonVi] = useState([]);

	const onFinish = (values) => {
		console.log(values);

		const convertedNgayBatDau = values?.ngayBatDau?.valueOf();
		const convertedNgayNhanDon = values?.ngayNhanDon?.valueOf();
		const convertedThoiHan = values?.thoiHan?.valueOf();

		const standardlizedData = {
			...values,
			loaiVanBan: "Văn bản đơn",

			ngayBatDau: convertedNgayBatDau ? convertedNgayBatDau : null,
			ngayNhanDon: convertedNgayNhanDon ? convertedNgayNhanDon : null,
			thoiHan: convertedThoiHan ? convertedThoiHan : null,

			noiDungChiDao: JSON.stringify(values?.noiDungChiDao),
			noiDungDon: JSON.stringify(values?.noiDungDon),
			noiDungVanBanPhanHoi: JSON.stringify(values?.noiDungVanBanPhanHoi),
		};
		if (id) {
			dispatch(updateVanBan({ data: standardlizedData, id: id }));
		} else {
			dispatch(createVanBan(standardlizedData)).then(() => {
				history.push("/quan-li-van-ban");
			});
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
		alert("Vui lòng nhập đầy đủ thông tin bắt buộc");
	};

	const [form] = Form.useForm();

	const autoGenerate = () => {
		form.setFieldsValue({
			tenVanBan: "Ten van ban don ",
			cccdNguoiGui: "077201012123",
			diaChiNguoiGui: "Ba ria vung tau",
			hoTenNguoiGui: "nguyen kiet",
			loaiDon: "Tố cáo",
			ngayBatDau: moment(1652234526057),

			sdtNguoiGui: "09090708",
			soKyHieu: "KHAs123123",
			thoiHan: moment(1652234526057),
			tinhTrangXuLyVanBanDon: "Trễ",
			huongXuLy: "huogn xu ly abc",
		});
	};

	useEffect(() => {
		if (id) {
			dispatch(getVanBanByID({ id: id }))
				.unwrap()
				.then((data) => {
					form.setFieldsValue({
						tenVanBan: data?.tenVanBan,
						soKyHieu: data?.soKyHieu,
						loaiDon: data?.loaiDon,
						ngayNhanDon: data?.ngayNhanDon
							? moment(data?.ngayNhanDon)
							: data?.ngayNhanDon,
						noiDungDon:
							data?.noiDungDon && JSON.parse(data?.noiDungDon),

						hoTenNguoiGui: data?.hoTenNguoiGui,
						sdtNguoiGui: data?.sdtNguoiGui,
						cccdNguoiGui: data?.cccdNguoiGui,
						diaChiNguoiGui: data?.diaChiNguoiGui,

						nguoiChiDao: data?.nguoiChiDao,
						donViId: data?.donViId,
						noiDungChiDao:
							data?.noiDungChiDao &&
							JSON.parse(data?.noiDungChiDao),
						ngayBatDau: data?.ngayBatDau
							? moment(data?.ngayBatDau)
							: null,
						thoiHan: data?.thoiHan ? moment(data?.thoiHan) : null,

						noiDungVanBanPhanHoi:
							data?.noiDungVanBanPhanHoi &&
							JSON.parse(data?.noiDungVanBanPhanHoi),
						huongXuLy: data?.huongXuLy,
						tinhTrangXuLyVanBanDon: data?.tinhTrangXuLyVanBanDon,
						ghiChu: data?.ghiChu,
					});
				});
		}
		dispatch(getAllDonVi())
			.unwrap()
			.then((data) => {
				setListDonVi(data);
			});
	}, [id]);

	return (
		<div className="container mx-auto max-w-full px-16 -mt-24 ">
			<div className="bg-gray-50 rounded-lg shadow-md p-10  ">
				<Form
					layout={"vertical"}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					form={form}
				>
					<div className="text-lg font-semibold mb-2">
						Nội dung đơn
					</div>

					<div className="flex space-x-10">
						<div className="w-1/2">
							<Form.Item
								label="Tên đơn"
								name="tenVanBan"
								rules={editVanBanDon_ValidationRules.tenVanBan}
							>
								<Input.TextArea
									placeholder="Tên văn bản/ Trích yếu văn bản"
									rows={3}
								/>
							</Form.Item>
						</div>

						<div className="w-1/2">
							<Form.Item label="Số ký hiệu đơn" name="soKyHieu">
								<Input placeholder="Số ký hiệu đơn" />
							</Form.Item>
						</div>
					</div>

					<div className="flex space-x-10">
						<Form.Item
							name="loaiDon"
							label="Loại đơn"
							style={{ width: "50%" }}
							rules={editVanBanDon_ValidationRules.loaiDon}
						>
							<Select placeholder="Loại đơn">
								{loaiDon &&
									loaiDon.map((item) => (
										<Option key={item} value={item}>
											{item}
										</Option>
									))}
							</Select>
						</Form.Item>

						<Form.Item
							name="ngayBatDau"
							label="Ngày chuyển đơn"
							style={{ width: "50%" }}
						>
							<DatePicker format="DD-MM-YYYY" />
						</Form.Item>
					</div>

					<FormListItems
						label="Nội dung đơn"
						addButtonLabel="Thêm nội dung đơn"
						name="noiDungDon"
					/>

					<div className="text-lg font-semibold mb-2">
						Thông tin người gửi đơn
					</div>

					<div className="flex space-x-10">
						<Form.Item
							label="Họ tên người gửi"
							style={{ width: "50%" }}
							name="hoTenNguoiGui"
							rules={editVanBanDon_ValidationRules.tenNguoiGui}
						>
							<Input placeholder="Họ tên người gửi" />
						</Form.Item>
						<Form.Item
							label="Số điện thoại"
							style={{ width: "50%" }}
							name="sdtNguoiGui"
						>
							<Input placeholder="Số điện thoại" />
						</Form.Item>
					</div>

					<Form.Item label="Địa chỉ người gửi" name="diaChiNguoiGui">
						<Input placeholder="Địa chỉ người gửi" />
					</Form.Item>

					<div className="flex space-x-10">
						<div className="w-1/2">
							<Form.Item label="CCCD/CMND" name="cccdNguoiGui">
								<Input placeholder="CCCD/CMND" />
							</Form.Item>
						</div>
						<div className="w-1/2"></div>
					</div>

					<hr className="my-4 py-4" />

					{/* <div className="text-lg font-semibold mb-2">Nội dung</div> */}

					{/* ===========updated==================== === */}
					{/* ===========updated==================== === */}
					<div className="flex space-x-10">
						<Form.Item
							label="Người chỉ đạo"
							name="nguoiChiDao"
							style={{ width: "50%" }}
							initialValue=""
						>
							<Input placeholder="Người chỉ đạo" />
						</Form.Item>
						<Form.Item
							name="donViId"
							label="Chuyển đơn vị xử lý"
							style={{ width: "50%" }}
							rules={editVanBanDon_ValidationRules.donVi}
						>
							<Select placeholder="Chọn đơn vị">
								{listDonVi &&
									listDonVi.map((item) => (
										<Option
											value={item?._id}
											key={item?._id}
										>
											{item?.name}
										</Option>
									))}
							</Select>
						</Form.Item>
					</div>

					<FormListItems
						label="Nội dung thực hiện"
						addButtonLabel="Thêm nội dung thực hiện"
						name="noiDungChiDao"
					/>

					<div className="flex space-x-10">
						<Form.Item
							name="ngayNhanDon"
							label="Ngày nhận đơn"
							initialValue={moment(Date.now())}
						>
							<DatePicker format="DD-MM-YYYY" />
						</Form.Item>
						<Form.Item name="thoiHan" label="Thời hạn">
							<DatePicker format="DD-MM-YYYY" />
						</Form.Item>
					</div>
					<hr className="my-4 py-4" />

					{/* =========================================================== */}
					{/* =========================================================== */}

					<FormListItems
						label="Nội dung văn bản phản hồi"
						addButtonLabel="Thêm nội dung phản hồi"
						name="noiDungVanBanPhanHoi"
					/>

					<Form.Item
						label="Hướng xử lý"
						name="huongXuLy"
						style={{ width: "80%" }}
					>
						<Input.TextArea />
					</Form.Item>

					<Form.Item
						name="tinhTrangXuLyVanBanDon"
						label="Tình trạng xử lý"
						style={{ width: "50%", marginRight: 10 }}
						rules={editVanBanDon_ValidationRules.tinhTrangXuLy}
					>
						<Select placeholder="Tình trạng xử lý văn bản đơn">
							{tinhTrangXuLy &&
								tinhTrangXuLy.map((item) => (
									<Option value={item} key={item}>
										{item}
									</Option>
								))}
						</Select>
					</Form.Item>

					<Form.Item
						label="Ghi chú"
						style={{ width: "80%" }}
						name="ghiChu"
						initialValue={""}
					>
						<Input.TextArea placeholder="Ghi chú" />
					</Form.Item>

					<div className="flex  justify-end">
						<Button className="mr-4" onClick={autoGenerate}>
							Auto generate
						</Button>
						<Button
							className="mr-4"
							onClick={() => history.goBack()}
						>
							Trở lại
						</Button>
						<Button type="primary" htmlType="submit">
							Hoàn tất
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default EditVanBanDon;
