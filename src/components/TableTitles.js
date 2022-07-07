import React from "react";

function TableTitles({ listTitles }) {
	return (
		<thead>
			<tr>
				{listTitles &&
					listTitles.map((item, index) => (
						<th
							key={index}
							className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left"
						>
							{item}
						</th>
					))}
			</tr>
		</thead>
	);
}

export const TableTitlesWithPercentage = ({ listTitles }) => {
	return (
		<thead>
			<tr>
				{listTitles &&
					listTitles.map((item, index) => (
						<th
							key={index}
							className={`px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left table-fixed ${item?.width}`}
						>
							{item?.name}
						</th>
					))}
			</tr>
		</thead>
	);
};

export default TableTitles;
