import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import api from '../api/index';
import QualitiesList from './qualitiesList';
import {useHistory} from 'react-router-dom';

const UserPage = ({id}) => {
    const history = useHistory();
    const [userById, setUserById] = useState();

    useEffect(() => {
        api.users.getById(id).then(data => setUserById(data));
    }, []);

    const handelSave = () => {
        history.push('/users');
    };
    return (
        <div style={{marginLeft: '10px'}}>
            {
                userById
                    ? <div>
                        <h1>{userById.name}</h1>
                        <h2>Профессия: {userById.profession.name}</h2>
                        <QualitiesList qualities={userById.qualities}/>
                        <p>completedMeetings: {userById.completedMeetings}</p>
                        <h1>Rate: {userById.rate}</h1>
                        <button onClick={() => handelSave()}>Все пользователи</button>
                    </div>
                    : <h1>Loading...</h1>
            }
        </div>
    );
};
UserPage.propTypes = {
    id: PropTypes.string.isRequired
};
export default UserPage;
