import { Button, Card, CardBody, CardHeader } from "@material-tailwind/react";
import ListBox from "components/ListBox";
import StatusCard from "components/StatusCard";
import { EmptyRow } from "components/TableRowCollection";
import { TongQuanRow } from "components/TableRowCollection";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllDonVi } from "redux/quan-ly-don-vi/quanlyDonViSlice";
import { getStatisticFile } from "redux/tong-quan/tongQuanSlice";
import { getTongQuan } from "redux/tong-quan/tongQuanSlice";

export default function Dashboard() {
	const dispatch = useDispatch();
	const currentDate = useRef(new Date());
	const history = useHistory();

	const [startDate, setStartDate] = useState(
		new Date(2022, 0, 1)
	);

	const [endDate, setEndDate] = useState(new Date());

	const [listDonVi, setListDonVi] = useState([]);

	const [listPendingVanBan, setlistPendingVanBan] = useState([]);

	const [listLateVanBan, setlistLateVanBan] = useState([]);

	const [filter, setFilter] = useState({
		tuNgay: new Date(
			2022,
			0,
			1
		).valueOf(),
		denNgay: currentDate.current.valueOf(),
		donViId: "",
	});

	const [statisticValues, setStatisticValues] = useState({
		tongCong: "",
		hoanThanh: "",
		sapHetHan: "",
		daQuaHan: "",
		daHuy:""
	});

	const handleOnSelectItem = (item) => {
		setFilter({ ...filter, donViId: item?._id });
	};

	const onChangeEndDate = (e) => {
		const date = new Date(e);
		if (filter.tuNgay > date.valueOf()) {
			alert("Vui lòng chọn ngày bắt đầu và ngày kết thúc hợp lý!");
		} else {
			setFilter({ ...filter, denNgay: date.valueOf() });
			setEndDate(date.valueOf());
		}
	};

	const onChangeStartDate = (e) => {
		const date = new Date(e);
		if (filter.denNgay < date.valueOf()) {
			alert("Vui lòng chọn ngày bắt đầu và ngày kết thúc hợp lý!");
		} else {
			setFilter({ ...filter, tuNgay: date.valueOf() });
			setStartDate(date.valueOf());
		}
	};

	const handleUpdateStatistic = () => {
		// updateTongQuanData();
		dispatch(getTongQuan(filter))
			.unwrap()
			.then((data) => {
				setStatisticValues({
					tongCong: data?.total,
					hoanThanh: data?.completed,
					sapHetHan: data?.working,
					daQuaHan: data?.late,
					daHuy:data?.cancel
				});
				setlistPendingVanBan(
					data?.van_ban_can_hoan_thanh.filter(
						(item) => item?.isDeleted === false
					)
				);
				setlistLateVanBan(
					data?.van_ban_qua_han.filter(
						(item) => item?.isDeleted === false
					)
				);
				toast.success("Cập nhật thành công!");
			});
	};

	const updateTongQuanData = () => {
		dispatch(getTongQuan(filter))
			.unwrap()
			.then((data) => {
				setStatisticValues({
					tongCong: data?.total,
					hoanThanh: data?.completed,
					sapHetHan: data?.working,
					daQuaHan: data?.late,
					daHuy:data?.cancel
				});
				setlistPendingVanBan(
					data?.van_ban_can_hoan_thanh.filter(
						(item) => item?.isDeleted === false
					)
				);
				setlistLateVanBan(
					data?.van_ban_qua_han.filter(
						(item) => item?.isDeleted === false
					)
				);
			});
	};

	const handleOnClickRow = (item) => {
		if (item?.loaiVanBan === "Văn bản đơn") {
			history.push(`/quan-li-van-ban/don/${item?._id}`);
		} else if (item?.loaiVanBan === "Văn bản hành chính") {
			history.push(`/quan-li-van-ban/hanh-chinh/${item?._id}`);
		}
	};

	const handleExportExcel = () => {
		dispatch(getStatisticFile(filter));
	};

	useEffect(() => {
		dispatch(getAllDonVi())
			.unwrap()
			.then((data) => {
				setListDonVi(data);
			});

		updateTongQuanData();
	}, []);

	// useEffect(() => {
	// 	console.log(filter);
	// }, [filter]);

	return (
		<>
			<div className="pb-28 px-3 md:px-8 h-auto ">
				<div className="container mx-auto max-w-full px-4 -mt-24">
					<div className="bg-white h-20 rounded-lg shadow-md p-4 flex items-center justify-around">
						<div className="flex items-center">
							<div className="font-semibold mr-1 xl:mr-3">
								Đơn vị:
							</div>
							<div className="w-36 xl:w-44">
								<ListBox
									selections={listDonVi}
									onSelectEvent={handleOnSelectItem}
									useKeyValue={true}
									filledColor
								/>
							</div>
						</div>

						<div className="flex  space-x-4 xl:space-x-6">
							<div className="flex items-center">
								<div className="font-semibold mr-1 xl:mr-3">
									Từ ngày:{" "}
								</div>
								<div>
									<DatePicker
										className="px-2 inline-block border-2 rounded-lg py-1 shadow-sm border-blue-200 w-32 xl:w-40 "
										selected={startDate}
										onChange={onChangeStartDate}
										dateFormat="dd/MM/yyyy"
									/>
								</div>
							</div>
							<div className="flex items-center">
								<div className="font-semibold mr-1 xl:mr-3">
									Đến ngày:{" "}
								</div>
								<div>
									<DatePicker
										className="px-2 inline-block border-2 rounded-lg py-1  shadow-sm border-blue-200 w-32 xl:w-40"
										selected={endDate}
										onChange={onChangeEndDate}
										dateFormat="dd/MM/yyyy"
									/>
								</div>
							</div>
						</div>

						<div className="hidden xl:flex xl:space-x-6">
							<Button
								color="blue"
								buttonType="filled"
								rounded={false}
								block={false}
								iconOnly={false}
								ripple="light"
								onClick={handleUpdateStatistic}
							>
								Cập nhật
							</Button>
							<Button
								color="brown"
								buttonType="outline"
								rounded={false}
								block={false}
								iconOnly={false}
								ripple="light"
								onClick={handleExportExcel}
							>
								Xuất file thống kê
							</Button>
						</div>

						<div className="flex space-x-4 xl:hidden">
							<Button
								color="blue"
								size="sm"
								buttonType="filled"
								rounded={false}
								block={false}
								iconOnly={false}
								ripple="light"
								onClick={handleUpdateStatistic}
							>
								Cập nhật
							</Button>
							<Button
								color="brown"
								size="sm"
								buttonType="outline"
								rounded={false}
								block={false}
								iconOnly={false}
								ripple="light"
								onClick={handleExportExcel}
							>
								Xuất file thống kê
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="px-3 md:px-8 h-auto -mt-14 mb-6">
				<div className="container mx-auto max-w-full">
					<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 ">
						<StatusCard
							color="lightBlue"
							icon="star"
							title="Số lượng"
							amount={statisticValues?.tongCong}
							percentageColor="blue"
							// date="Since last week"
						/>
						<StatusCard
							color="green"
							icon="check"
							title="Đã hoàn thành"
							amount={statisticValues?.hoanThanh}
							percentageColor="green"
						/>
						<StatusCard
							color="orange"
							icon="pending"
							title="Đang thực hiện"
							amount={statisticValues?.sapHetHan}
							percentageColor="orange"
						/>
						<StatusCard
							color="red"
							icon="dangerous"
							title="Đã hủy"
							amount={statisticValues?.daHuy}
							percentageColor="red"
						/>
					</div>
				</div>
			</div>

			<div className="px-3 md:px-8 h-auto">
				<div className="container mx-auto max-w-full">
					<div className="grid grid-cols-1 px-4 mb-16">
						<Card>
							<CardHeader color="orange" contentPosition="none">
								<div className="w-full flex items-center justify-between">
									<div className="flex items-center">
										<h2 className="text-white text-2xl">
											Văn bản cần hoàn thành
										</h2>
									</div>
								</div>
							</CardHeader>
							<CardBody>
								<div className="overflow-x-auto">
									<table className="items-center w-full bg-transparent border-collapse table-fixed">
										<thead>
											<tr>
												<th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-[10%] ">
													STT
												</th>
												<th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-[60%] ">
													Tên văn bản/ Trích yếu văn bản
												</th>
												<th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-[30%]">
													Ngày hết hạn
												</th>
											</tr>
										</thead>
										<tbody>
											{listPendingVanBan &&
												listPendingVanBan.length > 0 &&
												listPendingVanBan.map(
													(item, index) => (
														<TongQuanRow
															item={item}
															key={item?._id}
															onClickHandler={
																handleOnClickRow
															}
															index={index}
														/>
													)
												)}
											{/* <EmptyRow /> */}
										</tbody>
									</table>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</div>

			<div className="px-3 md:px-8 h-auto ">
				<div className="container mx-auto max-w-full">
					<div className="grid grid-cols-1 px-4 mb-16">
						<Card>
							<CardHeader color="red" contentPosition="none">
								<div className="w-full flex items-center justify-between">
									<div className="flex items-center">
										<h2 className="text-white text-2xl">
											Văn bản quá hạn
										</h2>
									</div>
								</div>
							</CardHeader>
							<CardBody>
								<div className="overflow-x-auto">
									<table className="items-center w-full bg-transparent border-collapse table-fixed">
										<thead>
											<tr>
												<th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-[10%] ">
													STT
												</th>
												<th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-[60%] ">
													Tên văn bản/ Trích yếu văn bản
												</th>
												<th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-[30%]">
													Ngày hết hạn
												</th>
											</tr>
										</thead>
										<tbody>
											{listLateVanBan &&
												listLateVanBan.length > 0 &&
												listLateVanBan.map(
													(item, index) => (
														<TongQuanRow
															item={item}
															key={item?._id}
															onClickHandler={
																handleOnClickRow
															}
															index={index}
														/>
													)
												)}
											{/* <EmptyRow /> */}
										</tbody>
									</table>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
}
