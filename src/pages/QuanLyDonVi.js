import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Input,
	Modal,
	ModalBody,
	ModalHeader,
	Textarea,
} from "@material-tailwind/react";
import { Form } from "antd";
import { DonViRow, EmptyRow } from "components/TableRowCollection";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	createDonVi,
	deleteDonVi,
	getAllDonVi,
	updateDonVi,
} from "redux/quan-ly-don-vi/quanlyDonViSlice";

function QuanLyDonVi(props) {
	const [form] = Form.useForm();

	const dispatch = useDispatch();

	const [showModal, setShowModal] = useState(false);

	const [listVanBan, setListVanBan] = useState([]);

	const [id, setId] = useState("");

	const handleOnCloseModal = () => {
		setShowModal(false);
		form.resetFields();
		setId("");
	};

	const updateRowToModal = (item) => {
		setId(item?.id);
		setShowModal(true);
		form.setFieldsValue({
			name: item?.name,
			description: item?.description,
		});
	};

	const onFinish = (values) => {
		console.log(values);

		if (id) {
			dispatch(updateDonVi({ data: values, id: id })).then(() => {
				getDonVi();
			});
		} else {
			dispatch(createDonVi({ data: values })).then(() => {
				getDonVi();
			});
		}
		handleOnCloseModal();
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const handleDeleteDonVi = async (id) => {
		dispatch(deleteDonVi({ id: id })).then(() => {
			getDonVi();
		});
	};

	const getDonVi = () => {
		dispatch(getAllDonVi())
			.unwrap()
			.then((data) => {
				setListVanBan(data.filter((item) => item.isDeleted === false));
			});
	};

	// ====== End api processing

	useEffect(() => {
		getDonVi();
	}, []);

	return (
		<>
			{/* <div className="bg-light-blue-500 pt-10 pb-28 px-3 md:px-8 h-auto "></div> */}
			<div className="px-3 md:px-8 h-auto -mt-24">
				<Card>
					<CardHeader color="purple" contentPosition="none">
						<div className="w-full flex items-center justify-between">
							<div className="flex items-center">
								<h2 className="text-white text-2xl">
									Danh sách đơn vị
								</h2>
							</div>
							<div className="flex items-center">
								<Button
									color="blue"
									buttonType="filled"
									size="regular"
									rounded={false}
									block={false}
									iconOnly={false}
									ripple="light"
									onClick={(e) => setShowModal(true)}
								>
									Thêm mới
								</Button>
							</div>
						</div>
					</CardHeader>
					<CardBody>
						<div className="overflow-x-auto">
							<table className="items-center w-full bg-transparent border-collapse table-fixed">
								<thead>
									<tr>
										<th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-[12%] ">
											STT
										</th>
										<th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-[36%]">
											Tên
										</th>
										<th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-[36%]">
											Mô tả
										</th>
										<th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-[12%]">
											Hành động
										</th>
									</tr>
								</thead>
								<tbody>
									{listVanBan &&
										listVanBan.map((item, index) => (
											<DonViRow
												item={item}
												index={index}
												key={index}
												deleteHandler={
													handleDeleteDonVi
												}
												updateHandler={updateRowToModal}
											/>
										))}
								</tbody>
							</table>
							{listVanBan && listVanBan.length === 0 && (
								<EmptyRow />
							)}
						</div>
					</CardBody>
				</Card>
			</div>
			<Modal size="regular" active={showModal} toggler={() => {}}>
				<ModalHeader toggler={handleOnCloseModal}>
					Chỉnh sửa đơn vị
				</ModalHeader>
				<ModalBody>
					<div className="w-96">
						<Form
							name="basic"
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							form={form}
						>
							<div className="mb-2">
								<Form.Item
									name="name"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập tên đơn vị",
										},
									]}
								>
									<Input
										type="text"
										color="lightBlue"
										size="regular"
										outline={true}
										placeholder="Tên đơn vị"
									/>
								</Form.Item>
							</div>

							<div className="mb-4">
								<Form.Item name="description">
									<Textarea
										color="lightBlue"
										size="regular"
										outline={true}
										placeholder="Mô tả"
									/>
								</Form.Item>
							</div>

							<Form.Item>
								<div className=" flex justify-center">
									<Button
										type="primary"
										color="blue"
										ripple="light"
									>
										Tạo đơn vị
									</Button>
								</div>
							</Form.Item>
						</Form>
					</div>
				</ModalBody>
			</Modal>
		</>
	);
}

export default QuanLyDonVi;
