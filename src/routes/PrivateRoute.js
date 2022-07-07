import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
	const { user: isAuthenticated, accessToken: token } = useSelector(
		(state) => state.authentication
	);

	return (
		<Route
			{...rest}
			render={() => {
				return isAuthenticated && token ? (
					children
				) : (
					<Redirect to="/login" />
				);
			}}
		/>
	);
}

export function PrivateRouteMaster({ children, ...rest }) {
	const isAuthenticated = useSelector((state) => state.authentication.user);
	const token = useSelector((state) => state.authentication.accessToken);
	const isMasterAdmin = useSelector(
		(state) => state.authentication.user?.role
	);

	return (
		<Route
			{...rest}
			render={() => {
				return isAuthenticated &&
					token &&
					isMasterAdmin === "master_admin" ? (
					children
				) : (
					<Redirect to="/login" />
				);
			}}
		/>
	);
}

export default PrivateRoute;
