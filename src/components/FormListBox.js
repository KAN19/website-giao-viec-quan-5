import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import React, { Fragment, useEffect, useState } from "react";
import { Controller } from "react-hook-form";

function FormListBox({
	name,
	control,
	placeholder,
	selections,
	filledColor,
	defaultValue,
}) {
	const [initialValue, setInitialValue] = useState(defaultValue);

	useEffect(() => {
		setInitialValue(defaultValue);
	}, [defaultValue, selections]);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value = initialValue } }) => (
				<Listbox onChange={onChange}>
					<div className="relative mt-1">
						<Listbox.Button
							className={`relative w-full cursor-default rounded-lg ${
								filledColor
									? "bg-[#03A9F4] hover:bg-[#2196F3] "
									: "bg-white hover:bg-gray-100"
							} py-2 pl-3 pr-10 text-left shadow-md focus:outline-none duration-200 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm hover:cursor-pointer`}
						>
							<span
								className={`block truncate font-medium ${
									filledColor ? "text-white" : "text-gray-800"
								}`}
							>
								{value?.label}
								{/* {value?.label
									? value?.label
									: "Chọn loại văn bản"} */}
							</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<SelectorIcon
									className={`h-5 w-5 ${
										filledColor
											? "text-white"
											: "text-gray-400"
									} `}
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{selections &&
									selections.map((option) => (
										<Listbox.Option
											key={option.value}
											className={({ active }) =>
												`relative cursor-default select-none py-2 px-4 m-1 rounded-lg  ${
													active
														? "bg-blue-500 shadow-md"
														: "text-gray-900"
												}`
											}
											value={option}
										>
											{option.label}
										</Listbox.Option>
									))}
							</Listbox.Options>
						</Transition>
					</div>
				</Listbox>
			)}
		/>
	);
}

export default FormListBox;
