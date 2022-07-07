import React from "react";
import { useLocation } from "react-router-dom";

function useQuery(props) {
	const { search } = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default useQuery;
