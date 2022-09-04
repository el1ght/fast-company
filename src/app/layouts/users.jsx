import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/userPage";
import UsersList from "../components/usersList";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UserPage userId={userId} /> : <UsersList />}</>;
};

export default Users;
