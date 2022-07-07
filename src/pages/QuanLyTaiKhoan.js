import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Input as InputMaterial,
	Label,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
} from "@material-tailwind/react";
import { Form } from "antd";
import { EmptyRow } from "components/TableRowCollection";
import { TaiKhoanRow } from "components/TableRowCollection";
import { TableTitlesWithPercentage } from "components/TableTitles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "redux/authentication/authenticationSlice";
import { createTaiKhoan } from "redux/quan-ly-tai-khoan/quanLyTaiKhoanSlice";
import { updateTaiKhoan } from "redux/quan-ly-tai-khoan/quanLyTaiKhoanSlice";
import { deleteTaiKhoan } from "redux/quan-ly-tai-khoan/quanLyTaiKhoanSlice";
import { getAllTaiKhoan } from "redux/quan-ly-tai-khoan/quanLyTaiKhoanSlice";
import { quanLyTaiKhoanTitles } from "utils/titlesCollections";

function QuanLyTaiKhoan(props) {
	const dispatch = useDispatch();

	const [showModalEdit, setShowModalEdit] = useState(false);

	const [listTaiKhoan, setListTaiKhoan] = useState([]);

	const [showModalItem, setShowModalItem] = useState(false);

	const [modalId, setModalId] = useState("");
	const [modalUsername, setModalUsername] = useState("");
	const [modalFullname, setModalFullname] = useState("");
	const [modalUserStatus, setModalUserStatus] = useState(true);

	const [form] = Form.useForm();

	const userCredential = useSelector(userSelector);

	const onFinish = (values) => {
		delete values.confirm;
		dispatch(createTaiKhoan({ data: { ...values, role: "admin" } })).then(
			() => {
				onCloseCreateModal();
				getTaiKhoan();
			}
		);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const onCloseCreateModal = () => {
		setShowModalEdit(false);
		form.resetFields();
	};

	const onCloseModalItem = () => {
		setShowModalItem(false);
		setModalUsername("");
		setModalFullname("");
		setModalUserStatus("");
		setModalId("");
	};

	const handleClickOnRow = (item) => {
		setShowModalItem(true);
		setModalId(item?._id);
		setModalUsername(item?.username);
		setModalFullname(item?.fullname);
		setModalUserStatus(item?.isActive);
	};

	const handleDeleteRow = (id) => {
		if (window.confirm("Hành động này không thể khôi phục được!")) {
			dispatch(deleteTaiKhoan({ id: id })).then(() => {
				getTaiKhoan();
			});
		}
	};

	const handleUpdateStatusTaiKhoan = () => {
		if (modalId) {
			dispatch(
				updateTaiKhoan({
					data: { isActive: !modalUserStatus },
					id: modalId,
				})
			).then(() => {
				onCloseModalItem();
				getTaiKhoan();
			});
		}
	};

	const getTaiKhoan = () => {
		dispatch(getAllTaiKhoan())
			.unwrap()
			.then((data) => {
				setListTaiKhoan(
					data?.filter((item) => item?.role !== "master_admin")
				);
				console.log(data);
			});
	};

	useEffect(() => {
		getTaiKhoan();
	}, []);

	return (
		<>
			<div className="px-3 md:px-8 h-auto -mt-24">
				<Card>
					<CardHeader color="purple" contentPosition="none">
						<div className="w-full flex items-center justify-between">
							<div className="flex items-center">
								<h2 className="text-white text-2xl">
									Danh sách quản trị viên
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
									onClick={(e) => setShowModalEdit(true)}
								>
									Tạo tài khoản
								</Button>
							</div>
						</div>
					</CardHeader>
					<CardBody>
						<div className="overflow-x-auto">
							<table className="items-center w-full bg-transparent border-collapse table-fixed">
								<TableTitlesWithPercentage
									listTitles={quanLyTaiKhoanTitles}
								/>
								<tbody>
									{listTaiKhoan.length > 0 &&
										listTaiKhoan.map((item, index) => (
											<TaiKhoanRow
												index={index}
												key={item?._id}
												item={item}
												clickEventHandler={
													handleClickOnRow
												}
												deleteHandler={handleDeleteRow}
												isDeletable={
													userCredential?.role ===
													"master_admin"
												}
											/>
										))}
								</tbody>
							</table>
							{listTaiKhoan && listTaiKhoan.length === 0 && (
								<EmptyRow />
							)}
						</div>
					</CardBody>
				</Card>
			</div>
			<Modal size="regular" active={showModalEdit} toggler={() => {}}>
				<ModalHeader toggler={() => onCloseCreateModal()}>
					Tạo tài khoản
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
									name="username"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập username",
										},
										{
											pattern: new RegExp(
												/^[A-Za-z0-9]*$/
											),
											message:
												"Vui lòng không điền ký tự đặc biệt",
										},
									]}
								>
									<InputMaterial
										type="text"
										color="lightBlue"
										size="regular"
										outline={true}
										placeholder="Username"
									/>
								</Form.Item>
							</div>

							<div className="mb-2">
								<Form.Item
									name="fullname"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập họ tên",
										},
									]}
								>
									<InputMaterial
										type="text"
										color="lightBlue"
										size="regular"
										outline={true}
										placeholder="Họ tên"
									/>
								</Form.Item>
							</div>

							<div className="mb-2">
								<Form.Item
									name="password"
									rules={[
										{
											required: true,
											message: "Vui lòng nhập mật khẩu",
										},
										{
											min: 8,
											message:
												"Mật khẩu ít nhất 8 ký tự.",
										},
									]}
								>
									<InputMaterial
										color="lightBlue"
										size="regular"
										outline={true}
										placeholder="Mật khẩu"
										type="password"
									/>
								</Form.Item>
							</div>

							<div className="mb-2">
								<Form.Item
									name="confirm"
									dependencies={["password"]}
									rules={[
										{
											required: true,
											message:
												"Vui lòng xác nhận mật khẩu",
										},
										({ getFieldValue }) => ({
											validator(_, value) {
												if (
													!value ||
													getFieldValue(
														"password"
													) === value
												) {
													return Promise.resolve();
												}
												return Promise.reject(
													new Error(
														"Mật khẩu không khớp! Vui lòng nhập lại"
													)
												);
											},
										}),
									]}
								>
									<InputMaterial
										color="lightBlue"
										size="regular"
										outline={true}
										placeholder="Xác nhận mật khẩu"
										type="password"
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
										Tạo tài khoản
									</Button>
								</div>
							</Form.Item>
						</Form>
					</div>
				</ModalBody>
			</Modal>

			{/* Thong tin tai khoan modal */}
			<Modal
				size="regular"
				active={showModalItem}
				toggler={() => setShowModalItem(false)}
			>
				<ModalHeader toggler={onCloseModalItem}>
					Thông tin tài khoản
				</ModalHeader>
				<ModalBody>
					<div className="w-96">
						<div className="text-lg mb-2">
							<span className="mr-4 font-semibold">
								Username:
							</span>
							<span>{modalUsername}</span>
						</div>
						<div className="text-lg mb-2">
							<span className="mr-4 font-semibold">Họ tên:</span>
							<span>{modalFullname}</span>
						</div>
						<div className="text-lg flex mb-2">
							<span className="mr-4 font-semibold">
								Trạng thái:
							</span>
							<span className="flex">
								{" "}
								{modalUserStatus ? (
									<Label color="green">Đang hoạt động</Label>
								) : (
									<Label color="pink">Ngừng hoạt động</Label>
								)}
							</span>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button
						color="red"
						buttonType="link"
						onClick={() => setShowModalItem(false)}
						ripple="dark"
					>
						Đóng
					</Button>

					{modalUserStatus ? (
						<Button
							color="pink"
							ripple="light"
							onClick={handleUpdateStatusTaiKhoan}
						>
							Khóa tài khoản
						</Button>
					) : (
						<Button
							color="green"
							ripple="light"
							onClick={handleUpdateStatusTaiKhoan}
						>
							Kích hoạt tài khoản
						</Button>
					)}
				</ModalFooter>
			</Modal>
		</>
	);
}

export default QuanLyTaiKhoan;
