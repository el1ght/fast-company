import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import Comments from '../../ui/comments';
import UserCard from '../../ui/userCard/userCard';
import QualitiesCard from '../../ui/userCard/qualitiesCard';
import CardMeetings from '../../ui/userCard/cardMeetings';

const UserPage = ({id}) => {
    const [userById, setUserById] = useState();
    useEffect(() => {
        api.users.getById(id).then(data => {
            setUserById(data);
        });
    }, []);

    return (

        <div className="container">
            {userById
                ? <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard id={id} userById={userById} />
                        <QualitiesCard data={userById.qualities} />
                        <CardMeetings value={userById.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments id={id} />
                    </div>
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
