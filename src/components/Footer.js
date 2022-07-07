export default function Footer() {
	return (
		<footer className="py-6 px-16 border-t border-gray-200  font-light flex flex-col lg:flex-row justify-between items-center mt-10">
			<p className="text-gray-700 mb-6 lg:mb-0 w-full flex justify-center ">
				Copyright &copy; {new Date().getFullYear()}
				{"  "}
				<a
					href="https://www.facebook.com/webdevstudios.org"
					className="text-light-blue-500 hover:text-light-blue-700"
				>
					Webdev Studio
				</a>
			</p>
		</footer>
	);
}
