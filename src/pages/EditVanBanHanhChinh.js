import { Button, DatePicker, Form, Input, Select } from "antd";
import FormListItems from "components/FormListItems";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllDonVi } from "redux/quan-ly-don-vi/quanlyDonViSlice";
import {
	createVanBan,
	getVanBanByID,
	updateVanBan,
} from "redux/quan-ly-van-ban/quanlyVanBanSlice";
import { editHanhChinh_ValidationRules } from "utils/constants";

const { Option } = Select;

function EditVanBanHanhChinh(props) {
	let { id } = useParams();

	const dispatch = useDispatch();
	const history = useHistory();

	const tinhTrangXuLy = useSelector(
		(state) => state.quanlyVanBan.TinhTrangXuLyVanBanHanhChinh
	);

	const [listDonVi, setListDonVi] = useState([]);

	const onFinish = (values) => {
		const convertedNgayBatDay = values?.ngayBatDau?.valueOf();
		const convertedThoiHan = values?.thoiHan?.valueOf();
		const convertedNgayBanHanh = values?.ngayBanHanh?.valueOf();

		const standardlizedData = {
			...values,
			loaiVanBan: "Văn bản hành chính",
			ngayBatDau: convertedNgayBatDay ? convertedNgayBatDay : null,
			noiDungVanBanHanhChinh: JSON.stringify(
				values?.noiDungVanBanHanhChinh
			),
			noiDungChiDao: JSON.stringify(values?.noiDungChiDao),
			thoiHan: convertedThoiHan ? convertedThoiHan : null,
			ngayBanHanh: convertedNgayBanHanh ? convertedNgayBanHanh : null,
		};
		console.log(standardlizedData);
		if (id) {
			dispatch(updateVanBan({ data: standardlizedData, id: id }));
		} else {
			dispatch(createVanBan(standardlizedData)).then(() => {
				history.push("/quan-li-van-ban");
			});
		}
	};

	const onFinishFailed = (errorInfo) => {
		alert("Vui lòng nhập đầy đủ thông tin bắt buộc");
		console.log("Failed:", errorInfo);
	};

	const [form] = Form.useForm();

	const handleAutoGenerate = () => {
		form.setFieldsValue({
			tenVanBan: "văn bản hành chính 1",
			soKyHieu: "HC123",
			ngayBatDau: moment(1652191406827),
			nguoiChiDao: "Nguyen Kiet",
			chuyenVienTheoDoi: "Kiet Nguyen",
			thoiHan: moment(1652191406827),
			tinhTrangXuLyVanBanHanhChinh: "Đã hủy",
			ngayBanHanh: moment(1652191406827),
			// trichYeu: "trích yểu nè",
			ghiChu: "Hello đây là ghi chú",
		});
	};

	useEffect(() => {
		if (id) {
			dispatch(getVanBanByID({ id: id }))
				.unwrap()
				.then((data) => {
					form.setFieldsValue({
						tenVanBan: data?.tenVanBan,
						coQuanBanHanh: data?.coQuanBanHanh,

						soKyHieu: data?.soKyHieu,
						ngayBanHanh: data?.ngayBanHanh
							? moment(data?.ngayBanHanh)
							: null,

						nguoiChiDao: data?.nguoiChiDao,
						noiDungChiDao:
							data?.noiDungChiDao &&
							JSON.parse(data?.noiDungChiDao),

						donViId: data?.donViId,
						ngayBatDau: data?.ngayBatDau
							? moment(data?.ngayBatDau)
							: null,
						thoiHan: data?.thoiHan ? moment(data?.thoiHan) : null,

						chuyenVienTheoDoi: data?.chuyenVienTheoDoi,
						tinhTrangXuLyVanBanHanhChinh:
							data?.tinhTrangXuLyVanBanHanhChinh,

						// trichYeu: data?.trichYeu,
						noiDungVanBanHanhChinh:
							data?.noiDungVanBanHanhChinh &&
							JSON.parse(data?.noiDungVanBanHanhChinh),
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
					onChange={(data) => console.log("data changed", data)}
					form={form}
				>
					<div className="text-lg font-semibold mb-2">
						Thông tin cơ bản
					</div>

					<div className="flex space-x-10">
						<div className="w-[50%]">
							<Form.Item
								label="Tên văn bản/ Trích yếu văn bản"
								name="tenVanBan"
								rules={editHanhChinh_ValidationRules.tenVanBan}
							>
								<Input.TextArea
									placeholder="Tên văn bản/ Trích yếu văn bản"
									rows={3}
								/>
							</Form.Item>
						</div>

						<div className="w-[50%]">
							<Form.Item
								label="Cơ quan ban hành"
								name="coQuanBanHanh"
							>
								<Input placeholder="Cơ quan ban hành" />
							</Form.Item>
						</div>
					</div>

					<div className="flex space-x-10">
						<div className="w-[50%]">
							<Form.Item
								label="Số ký hiệu văn bản"
								name="soKyHieu"
							>
								<Input placeholder="Số ký hiệu đơn" />
							</Form.Item>
						</div>

						<div className="w-[50%]">
							<Form.Item
								name="ngayBanHanh"
								label="Ngày ban hành"
								style={{ width: "50%" }}
								rules={
									editHanhChinh_ValidationRules.ngayBanHanh
								}
								initialValue={null}
							>
								<DatePicker format="DD-MM-YYYY" />
							</Form.Item>
						</div>
					</div>

					<div className="flex space-x-10 ">
						<div className="w-[50%] ">
							<Form.Item label="Người chỉ đạo" name="nguoiChiDao">
								<Input placeholder="Người chỉ đạo" />
							</Form.Item>
						</div>
						<div className="flex space-x-10 w-1/2"></div>
					</div>

					<FormListItems
						label="Nội dung chỉ đạo"
						addButtonLabel="Thêm nội dung chỉ đạo"
						name="noiDungChiDao"
					/>

					<div className="flex space-x-10 ">
						<div className="w-[50%] ">
							<Form.Item
								name="donViId"
								label="Đơn vị thực hiện"
								rules={editHanhChinh_ValidationRules.donVi}
							>
								<Select placeholder="Chọn đơn vị thực hiện">
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
						<div className="flex space-x-10 w-1/2">
							<Form.Item
								name="ngayBatDau"
								label="Ngày bắt đầu"
								initialValue={moment(Date.now())}
							>
								<DatePicker format="DD-MM-YYYY" />
							</Form.Item>
							<Form.Item name="thoiHan" label="Thời hạn">
								<DatePicker format="DD-MM-YYYY" />
							</Form.Item>
						</div>
					</div>

					<div className="flex space-x-10">
						<Form.Item
							label="Chuyên viên theo dõi, xử lý"
							style={{ width: "50%" }}
							name="chuyenVienTheoDoi"
						>
							<Input placeholder="Chuyên viên theo dõi, xử lý" />
						</Form.Item>

						<Form.Item
							name="tinhTrangXuLyVanBanHanhChinh"
							label="Tình trạng xử lý"
							style={{ width: "50%" }}
							rules={editHanhChinh_ValidationRules.tinhTrang}
						>
							<Select placeholder="Tình trạng xử lý văn bản">
								{tinhTrangXuLy &&
									tinhTrangXuLy.map((item) => (
										<Option value={item} key={item}>
											{item}
										</Option>
									))}
							</Select>
						</Form.Item>
					</div>

					{/* <div className="flex space-x-10">
						<Form.Item
							label="Trích yếu"
							style={{ width: "50%" }}
							name="trichYeu"
						>
							<Input placeholder="Trích yếu" />
						</Form.Item>
						<Form.Item
							name="ngayBanHanh"
							label="Ngày ban hành"
							style={{ width: "50%" }}
							rules={editHanhChinh_ValidationRules.ngayBanHanh}
						>
							<DatePicker format="DD-MM-YYYY" />
						</Form.Item>
					</div> */}

					<FormListItems
						label="Nội dung văn bản/ Tiến độ thực hiện"
						addButtonLabel="Thêm nội dung văn bản"
						name="noiDungVanBanHanhChinh"
					/>

					<Form.Item
						label="Ghi chú/ Kết quả thực hiện"
						style={{ width: "80%" }}
						name="ghiChu"
					>
						<Input.TextArea placeholder="Ghi chú" />
					</Form.Item>

					<div className="flex  justify-end">
						<Button className="mr-4" onClick={handleAutoGenerate}>
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

export default EditVanBanHanhChinh;
