export const timestampToDate = (timestamp) => {
	if (timestamp === null) return "";
	var date = new Date(timestamp);
	const convertedDate =
		date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
	return convertedDate;
};
