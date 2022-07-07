import { Pagination, PaginationItem } from "@material-tailwind/react";
import useQuery from "hooks/useQuery";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { totalItemsPerPage } from "utils/constants";

function WrappedPagination({ totalItems }) {
	const pageNumbers = [];

	let query = useQuery();

	for (let i = 1; i <= Math.ceil(totalItems / totalItemsPerPage); i++) {
		pageNumbers.push(i);
	}

	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		if (query.get("pageNo")) {
			setCurrentPage(query.get("pageNo"));
			console.log(query.get("pageNo"));
		}
	}, [query]);

	return (
		<div className="inline-block">
			<Pagination>
				{pageNumbers &&
					pageNumbers?.map((item, index) => (
						<Link to={`?pageNo=${item}`} key={item}>
							<PaginationItem
								// eslint-disable-next-line eqeqeq
								color={currentPage == item ? "lightBlue" : ""}
								ripple="light"
							>
								{item}
							</PaginationItem>
						</Link>
					))}
				{pageNumbers.length === 0 && (
					<PaginationItem color={"lightBlue"} ripple="light">
						1
					</PaginationItem>
				)}
			</Pagination>
		</div>
	);
}

export default WrappedPagination;
