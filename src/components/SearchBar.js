import { XCircleIcon } from "@heroicons/react/solid";
import React, { useRef, useState } from "react";

function SearchBar({ searchValue, onSearch }) {
	const typingTimeoutRef = useRef(null);

	const [localSearchTerm, setLocalSearchTerm] = useState(searchValue);

	const handleDeleteSearch = () => {
		setLocalSearchTerm("");
		if (onSearch) {
			onSearch("");
		}
	};

	const handleSearchTermChange = (e) => {
		const value = e.target.value;
		setLocalSearchTerm(value);

		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}

		typingTimeoutRef.current = setTimeout(() => {
			if (onSearch) {
				onSearch(value);
			}
		}, 500);
	};

	return (
		<div class="flex justify-center items-center mr-4">
			<div class="xl:w-60 ">
				<div class="input-group relative flex w-full bg-white rounded-md">
					<input
						type="search"
						class="form-control relative flex-auto min-w-0 block w-full pl-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-gray-300 rounded-l-md focus:text-gray-700 focus:bg-white focus:outline-none"
						placeholder="Search"
						value={localSearchTerm}
						onChange={handleSearchTermChange}
					/>
					{/* {localSearchTerm && (
						<div
							className=" flex justify-center items-center hover:cursor-pointer mr-1"
							onClick={handleDeleteSearch}
						>
							<XCircleIcon className="h-5 w-5 text-gray-600 " />
						</div>
					)} */}
					<button
						class="btn px-4 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-r-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center "
						type="button"
						id="button-addon2"
					>
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fas"
							data-icon="search"
							class="w-4"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<path
								fill="currentColor"
								d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
							></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}

export default SearchBar;
