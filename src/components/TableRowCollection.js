import { Button, Icon, Label } from "@material-tailwind/react";
import useQuery from "hooks/useQuery";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { userSelector } from "redux/authentication/authenticationSlice";
import { credentialSelector } from "redux/authentication/authenticationSlice";
import { totalItemsPerPage } from "utils/constants";
import { timestampToDate } from "utils/converter";

const basicRowStyle =
	"border-b border-gray-200 align-middle font-light text-sm px-2 py-4 text-left ";

export function HanhchinhRow({ item, index, deleteHandler, isDeletable }) {
	const history = useHistory();
	const location = useLocation();
	let query = useQuery();

	const page = query.get("pageNo") ? query.get("pageNo") : 1;

	const moveToEditPage = (e) => {
		e.stopPropagation();
		history.push(`${location.pathname}/hanh-chinh/${item?._id}`);
	};

	const handleDeleteItem = (e) => {
		e.stopPropagation();
		if (window.confirm("Hành động này không thể khôi phục được!")) {
			if (deleteHandler) {
				deleteHandler(item?._id);
			}
		}
	};

	return (
		<tr
			className="hover:bg-gray-100 cursor-pointer"
			onClick={moveToEditPage}
		>
			<th className={`${basicRowStyle}`}>
				{(page - 1) * totalItemsPerPage + index + 1}
			</th>
			<th className={`${basicRowStyle} `}>{item?.tenVanBan}</th>
			<th className={`${basicRowStyle}`}>{item?.soKyHieu}</th>
			<th className={`${basicRowStyle}`}>
				{timestampToDate(item?.ngayBatDau)}
			</th>
			<th className={`${basicRowStyle}`}>{item?.nguoiChiDao}</th>
			<th className={`${basicRowStyle}`}>{item?.chuyenVienTheoDoi}</th>
			<th className={`${basicRowStyle}`}>
				{timestampToDate(item?.thoiHan)}
			</th>
			<th className={`${basicRowStyle}`}>
				{item?.tinhTrangXuLyVanBanHanhChinh}
			</th>
			<th className={`${basicRowStyle}`}>
				{timestampToDate(item?.ngayBanHanh)}
			</th>
			{/* <th className={`${basicRowStyle}`}>{item?.trichYeu}</th> */}
			<th className={`${basicRowStyle}`}>
				<div className="flex">
					<div className="mr-3 ">
						<Button
							color="amber"
							buttonType="filled"
							size="sm"
							rounded={true}
							block={false}
							iconOnly={true}
							ripple="light"
							onClick={moveToEditPage}
						>
							<Icon name="edit" size="sm" />
						</Button>
					</div>
					{isDeletable && (
						<div className="h-full">
							<Button
								color="red"
								buttonType="filled"
								size="sm"
								rounded={true}
								block={false}
								iconOnly={true}
								ripple="light"
								onClick={handleDeleteItem}
							>
								<Icon name="delete" size="sm" />
							</Button>
						</div>
					)}
				</div>
			</th>
		</tr>
	);
}

export function DonRow({ item, index, deleteHandler, isDeletable }) {
	const history = useHistory();
	const location = useLocation();
	let query = useQuery();

	const page = query.get("pageNo") ? query.get("pageNo") : 1;

	const moveToEditPage = (e) => {
		e.stopPropagation();
		history.push(`${location.pathname}/don/${item?._id}`);
	};

	const handleDeleteItem = (e) => {
		e.stopPropagation();
		if (window.confirm("Xoa la khong lay lai dc dau nhe?")) {
			deleteHandler(item?._id);
		}
	};

	return (
		<tr
			className="hover:bg-gray-100 cursor-pointer"
			onClick={moveToEditPage}
		>
			<th className={`${basicRowStyle}`}>
				{(page - 1) * totalItemsPerPage + index + 1}
			</th>
			<th className={`${basicRowStyle}`}>
				{item?.loaiDon || "Loai don ne"}
			</th>
			<th className={`${basicRowStyle}`}>
				{item?.tenVanBan || "Ten van ban"}
			</th>
			<th className={`${basicRowStyle}`}>
				{timestampToDate(item?.ngayBatDau) || "Ngay bat dau ??"}
			</th>
			<th className={`${basicRowStyle}`}>
				{item?.hoTenNguoiGui || "ten nguoi gui di"}
			</th>
			<th className={`${basicRowStyle}`}>
				{timestampToDate(item?.thoiHan) || "Thoi han"}
			</th>
			<th className={`${basicRowStyle}`}>
				{item?.tinhTrangXuLyVanBanDon || "tinh trang xu ly ne"}
			</th>
			<th className={`${basicRowStyle}`}>
				<div className="flex">
					<div className="mr-3">
						<Button
							color="amber"
							buttonType="filled"
							size="sm"
							rounded={true}
							block={false}
							iconOnly={true}
							ripple="light"
							onClick={moveToEditPage}
						>
							<Icon name="edit" size="sm" />
						</Button>
					</div>
					{isDeletable && (
						<div>
							<Button
								color="red"
								buttonType="filled"
								size="sm"
								rounded={true}
								block={false}
								iconOnly={true}
								ripple="light"
								onClick={handleDeleteItem}
							>
								<Icon name="delete" size="sm" />
							</Button>
						</div>
					)}
				</div>
			</th>
		</tr>
	);
}

export function TongQuanRow({ item, index, onClickHandler }) {
	const handleOnClickRow = () => {
		if (onClickHandler) {
			onClickHandler(item);
		}
	};

	return (
		<tr
			className="hover:bg-gray-100  hover:cursor-pointer"
			onClick={handleOnClickRow}
		>
			<th className={`${basicRowStyle}`}>{index + 1}</th>
			<th className={`${basicRowStyle}`}>
				{item?.tenVanBan || "Ten van ban"}
			</th>
			<th className={`${basicRowStyle}`}>
				{timestampToDate(item?.thoiHan) || "Ten van ban"}
			</th>
		</tr>
	);
}

export function TaiKhoanRow({
	item,
	clickEventHandler,
	index,
	deleteHandler,
	isDeletable,
}) {
	const onClickingRow = () => {
		if (clickEventHandler) {
			clickEventHandler(item);
		}
	};

	const onDeleteRow = () => {
		if (deleteHandler) {
			deleteHandler(item?._id);
		}
	};

	return (
		<tr className="hover:bg-gray-100 ">
			<th className={`${basicRowStyle}`}>{index + 1}</th>
			<th className={`${basicRowStyle}`}>{item?.username}</th>
			<th className={`${basicRowStyle}`}>{item?.fullname}</th>
			<th className={`${basicRowStyle}`}>
				{item?.isActive && <Label color="green">Đang hoạt động</Label>}
				{!item?.isActive && <Label color="pink">Ngưng hoạt động</Label>}
			</th>
			<th className={`${basicRowStyle}`}>
				<div className="flex">
					<div className="mr-3">
						<Button
							color="amber"
							buttonType="filled"
							size="sm"
							rounded={true}
							block={false}
							iconOnly={true}
							ripple="light"
							onClick={onClickingRow}
						>
							<Icon name="edit" size="sm" />
						</Button>
					</div>
					{isDeletable && (
						<div>
							<Button
								color="red"
								buttonType="filled"
								size="sm"
								rounded={true}
								block={false}
								iconOnly={true}
								ripple="light"
								onClick={onDeleteRow}
							>
								<Icon name="delete" size="sm" />
							</Button>
						</div>
					)}
				</div>
			</th>
		</tr>
	);
}

export function DonViRow({ item, index, deleteHandler, updateHandler }) {
	const handleDeleteRow = () => {
		if (window.confirm("Bạn có muốn xóa dòng này")) {
			if (deleteHandler) {
				deleteHandler(item?._id);
			}
		}
	};

	const handleUpdateRow = () => {
		if (updateHandler) {
			updateHandler({
				id: item?._id,
				name: item?.name,
				description: item?.description,
			});
		}
	};

	return (
		<tr>
			<th className={`${basicRowStyle}`}>{index + 1}</th>
			<th className={`${basicRowStyle}`}>{item?.name}</th>
			<th className={`${basicRowStyle}`}>
				<i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>{" "}
				{item?.description ? item?.description : "blank"}
			</th>

			<th className={`${basicRowStyle}`}>
				<div className="flex">
					<div className="mr-3">
						<Button
							color="amber"
							buttonType="filled"
							size="sm"
							rounded={true}
							block={false}
							iconOnly={true}
							ripple="light"
							onClick={handleUpdateRow}
						>
							<Icon name="edit" size="sm" />
						</Button>
					</div>
					<div>
						<Button
							color="red"
							buttonType="filled"
							size="sm"
							rounded={true}
							block={false}
							iconOnly={true}
							ripple="light"
							onClick={handleDeleteRow}
						>
							<Icon name="delete" size="sm" />
						</Button>
					</div>
				</div>
			</th>
		</tr>
	);
}

export function EmptyRow() {
	return (
		<div className="w-full  flex justify-center  ">
			<th className={`${basicRowStyle}`}>Không tìm thấy kết quả</th>
		</div>
	);
}
