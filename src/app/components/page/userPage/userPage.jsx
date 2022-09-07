import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import QualitiesList from '../../ui/qualities/qualitiesList';
import {Link} from 'react-router-dom';

const UserPage = ({id, edit}) => {
    const [userById, setUserById] = useState();

    useEffect(() => {
        setUserById();
    }, [edit]);

    useEffect(() => {
        api.users.getById(id).then(data => {
            setUserById(data);
        });
    }, [edit]);

    return (
        <div style={{marginLeft: '10px'}}>
            {userById
                ? <div>
                    <h1>{userById.name}</h1>
                    <h2>Профессия: {userById.profession.name}</h2>
                    <QualitiesList qualities={userById.qualities}/>
                    <p>completedMeetings: {userById.completedMeetings}</p>
                    <h1>Rate: {userById.rate}</h1>
                    <Link to={`/users/${id}/edit`}>
                        <button>Изменить</button>
                    </Link>
                </div>
                : <h1>Loading...</h1>
            }
        </div>
    );
};
UserPage.propTypes = {
    id: PropTypes.string.isRequired,
    edit: PropTypes.string
};
export default UserPage;
