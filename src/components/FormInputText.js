import { Input } from "@material-tailwind/react";
import React from "react";
import { Controller } from "react-hook-form";

function FormInputText({ name, control, placeholder }) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value } }) => (
				<Input
					type="text"
					color="lightBlue"
					size="regular"
					outline={false}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
			)}
		/>
	);
}

export default FormInputText;
