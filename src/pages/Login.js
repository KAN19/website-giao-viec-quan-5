import Button from "@material-tailwind/react/Button";
import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import CardHeader from "@material-tailwind/react/CardHeader";
import Checkbox from "@material-tailwind/react/Checkbox";
import H5 from "@material-tailwind/react/Heading5";
import InputIcon from "@material-tailwind/react/InputIcon";
import authenticationApi from "api/authenticationApi";
import quanlyDonViApi from "api/quanlyDonViApi";
import Container from "components/login/Container";
import Page from "components/login/Page";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { saveUserData } from "redux/authentication/authenticationSlice";

export default function Login() {
	let history = useHistory();

	const isAuthenticated = useSelector((state) => state.authentication.user);

	const dispatch = useDispatch();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		login();
	};

	const login = async () => {
		try {
			const response = await authenticationApi.login({
				username: username,
				password: password,
			});
			dispatch(
				saveUserData({
					user: response.user,
					token: response.accessToken,
					// expiresIn: response.expiresIn,
					expiresIn: 1652794913,
				})
			);
			localStorage.setItem("token", response.accessToken);
			history.push("/");
		} catch (error) {
			alert(
				"Đăng nhập thất bại. Vui lòng kiểm tra mật khẩu hoặc tài khoản!"
			);
		}
	};

	if (isAuthenticated) {
		return <Redirect to="/" />;
	}

	return (
		<Page>
			<Container>
				<Card>
					<CardHeader color="lightBlue">
						<H5 color="white" style={{ marginBottom: 0 }}>
							Đăng nhập
						</H5>
					</CardHeader>
					<CardBody>
						<div className="mb-12 px-4 bg-bb">
							<InputIcon
								type="email"
								color="lightBlue"
								placeholder="Username"
								iconName="person"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="mb-4 px-4">
							<InputIcon
								type="password"
								color="lightBlue"
								placeholder="Password"
								iconName="lock"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						{/* <div className="mb-4 px-4">
							<Checkbox
								color="lightBlue"
								text="Remember Me"
								id="remember"
							/>
						</div> */}
					</CardBody>
					<CardFooter>
						<div
							className="flex justify-center bg-bb"
							onClick={handleLogin}
						>
							<Button
								color="lightBlue"
								buttonType="link"
								size="lg"
								ripple="dark"
							>
								Đăng nhập
							</Button>
						</div>
					</CardFooter>
				</Card>
			</Container>
		</Page>
	);
}
