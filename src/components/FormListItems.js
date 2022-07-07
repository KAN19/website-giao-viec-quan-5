import { Button, Form, Input } from "antd";
import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

function FormListItems({ initialValue, label, addButtonLabel, name }) {
	return (
		<Form.List
			name={name}
			initialValue={initialValue ? initialValue : [""]}
		>
			{(fields, { add, remove }, { errors }) => (
				<>
					{fields.map((field, index) => (
						<Form.Item
							label={index === 0 ? label : ""}
							required={false}
							key={field.key}
						>
							<Form.Item
								{...field}
								validateTrigger={["onChange", "onBlur"]}
								noStyle
							>
								<Input.TextArea style={{ width: "80%" }} />
							</Form.Item>
							{fields.length > 1 ? (
								<MinusCircleOutlined
									style={{ color: "#ef4444" }}
									className="dynamic-delete-button ml-2 text-lg "
									onClick={() =>
										window.confirm(
											"Hành động này không thể khôi phục"
										) && remove(field.name)
									}
								/>
							) : null}
						</Form.Item>
					))}
					<Form.Item
						style={{
							marginTop: -15,
						}}
					>
						<Button
							type="dashed"
							onClick={() => add()}
							icon={<PlusOutlined />}
						>
							{addButtonLabel}
						</Button>

						<Form.ErrorList errors={errors} />
					</Form.Item>
				</>
			)}
		</Form.List>
	);
}

export default FormListItems;
