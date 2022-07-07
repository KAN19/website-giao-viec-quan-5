export default function Container({ children }) {
	return (
		<div className="flex justify-center items-center h-full">
			<div className="max-w-sm w-96">{children}</div>
		</div>
	);
}
