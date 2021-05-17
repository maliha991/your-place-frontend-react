import React, { useEffect, useState } from "react";

import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedUsers, setLoadedUsers] = useState();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const responseData = await sendRequest(
					"http://localhost:5000/api/users"
				);
				setLoadedUsers(responseData.users);
			} catch (error) {}
		};
		fetchUsers();
	}, [sendRequest]);

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner asOverlay />
				</div>
			)}
			{!isLoading && loadedUsers && <UserList items={loadedUsers} />}
		</React.Fragment>
	);
};

export default Users;