import React from 'react';
import UserPage from '../components/page/userPage';
import {useParams} from 'react-router-dom';
import UsersListPage from '../components/page/usersListPage';
import UserEdit from '../components/ui/userEdit';

const Users = () => {
    const params = useParams();
    const {userId} = params;
    const {edit} = useParams();
    return (
        <>
            {userId && edit === 'edit'
                ? <UserEdit id={userId} />
                : userId
                    ? <UserPage id={userId} edit={edit}/>
                    : <UsersListPage />}
        </>
    );
};
export default Users;
