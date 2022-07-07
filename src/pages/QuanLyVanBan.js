import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "@material-tailwind/react";
import ListBox from "components/ListBox";
import SearchBar from "components/SearchBar";
import { DonRow, EmptyRow, HanhchinhRow } from "components/TableRowCollection";
import TableTitles from "components/TableTitles";
import WrappedPagination from "components/WrappedPagination";
import useQuery from "hooks/useQuery";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { userSelector } from "redux/authentication/authenticationSlice";
import {
	deleteVanBan,
	getAllVanBan,
} from "redux/quan-ly-van-ban/quanlyVanBanSlice";
import { totalItemsPerPage } from "utils/constants";
import { documentOptions, listTitles } from "utils/titlesCollections";

function QuanLyVanBan(props) {
	const history = useHistory();

	const dispatch = useDispatch();

	const loaiVanBan = useSelector((state) => state.quanlyVanBan.LoaiVanBan);

	const [displayingLoaiVanBan, setDisplayingLoaiVanBan] = useState(null);

	const [searchValue, setSearchValue] = useState("");

	const [listVanBan, setListVanBan] = useState([]);

	const [totalItems, setTotalItems] = useState(1);

	const userCredential = useSelector(userSelector);

	let { url } = useRouteMatch();

	let query = useQuery();

	const [showModal, setShowModal] = useState(false);

	const handleSelectCreatingOption = (selection) => {
		console.log(selection);
		history.push(`${url}/${selection}`);
		setShowModal(false);
	};

	const getAllvanBan = () => {
		dispatch(
			getAllVanBan({
				loaiVanBan: displayingLoaiVanBan,
				size: totalItemsPerPage,
				pageNo: query.get("pageNo") ? query.get("pageNo") : 1,
				search: searchValue,
			})
		)
			.unwrap()
			.then((response) => {
				setListVanBan(
					response?.data?.filter((item) => !item.isDeleted).reverse()
					// response?.data
				);
				setTotalItems(response?.total);
				console.log(response?.data);
			});
	};

	const handleOnSelectItem = (item) => {
		setDisplayingLoaiVanBan(item);
		setSearchValue("");
		if (query.has("pageNo")) {
			history.replace({
				search: "?pageNo=1",
			});
		}
	};

	const handleDeleteItem = (id) => {
		console.log(id);
		dispatch(deleteVanBan({ id: id })).then(() => {
			getAllvanBan();
		});
	};

	const handleSearch = (searchTerm) => {
		if (query.has("pageNo")) {
			history.replace({
				search: "?pageNo=1",
			});
		}
		setSearchValue(searchTerm);
	};

	useEffect(() => {
		setDisplayingLoaiVanBan(loaiVanBan[0]);
	}, []);

	useEffect(() => {
		if (displayingLoaiVanBan) {
			getAllvanBan();
		}
	}, [displayingLoaiVanBan, query, searchValue]);

	return (
		<>
			<div className="px-3 md:px-8 h-auto -mt-24">
				<Card>
					<CardHeader color="purple" contentPosition="none">
						<div className="w-full flex items-center justify-between">
							<div className="flex items-center ">
								<h2 className="text-white text-2xl ">
									Danh sách văn bản
								</h2>
								<div className="ml-4 w-48">
									<ListBox
										selections={loaiVanBan}
										onSelectEvent={handleOnSelectItem}
									/>
								</div>
							</div>
							<div className="flex items-center">
								<SearchBar
									searchValue={searchValue}
									onSearch={handleSearch}
								/>

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
							{displayingLoaiVanBan ===
								documentOptions.hanhchinh && (
								<table className="items-center w-full bg-transparent border-collapse">
									<TableTitles
										listTitles={
											listTitles[displayingLoaiVanBan]
										}
									/>
									<tbody>
										{listVanBan &&
											listVanBan?.length > 0 &&
											listVanBan.map((item, index) => (
												<HanhchinhRow
													key={item?._id}
													index={index}
													deleteHandler={
														handleDeleteItem
													}
													item={item}
													isDeletable={
														userCredential?.role ===
														"master_admin"
													}
												/>
											))}
									</tbody>
								</table>
							)}
							{displayingLoaiVanBan === documentOptions.don && (
								<table className="items-center w-full bg-transparent border-collapse">
									<TableTitles
										listTitles={
											listTitles[displayingLoaiVanBan]
										}
									/>
									<tbody>
										{listVanBan &&
											listVanBan?.length > 0 &&
											listVanBan.map((item, index) => (
												<DonRow
													key={item?._id}
													item={item}
													index={index}
													deleteHandler={
														handleDeleteItem
													}
													isDeletable={
														userCredential?.role ===
														"master_admin"
													}
												/>
											))}
									</tbody>
								</table>
							)}
							{listVanBan && listVanBan.length === 0 && (
								<EmptyRow />
							)}
						</div>
						<div className="flex justify-center mt-4">
							<WrappedPagination totalItems={totalItems} />
						</div>
					</CardBody>
				</Card>
			</div>

			<Modal
				size="regular"
				active={showModal}
				toggler={() => setShowModal(false)}
			>
				<ModalHeader toggler={() => setShowModal(false)}>
					Chọn loại văn bản
				</ModalHeader>
				<ModalBody>
					<div className="text-base leading-relaxed text-gray-600 font-normal ">
						Vui lòng chọn loại văn bản để tiếp tục
					</div>
				</ModalBody>
				<ModalFooter>
					<Button
						color="lightBlue"
						buttonType="outline"
						onClick={() => handleSelectCreatingOption("don")}
						ripple="dark"
					>
						Văn bản đơn
					</Button>

					<Button
						color="blue"
						onClick={() => handleSelectCreatingOption("hanh-chinh")}
						ripple="dark"
					>
						Văn bản hành chính
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}

export default QuanLyVanBan;
