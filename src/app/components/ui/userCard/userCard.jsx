import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import CardRate from './cardRate';

const UserCard = ({id, userById}) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <Link to={`/users/${id}/edit`}>
                    <button
                        className="
                                    position-absolute
                                    top-0
                                    end-0
                                    btn btn-light btn-sm
                                "
                    >
                        <i className="bi bi-gear"></i>
                    </button>
                </Link>
                <div
                    className="
                      d-flex
                     flex-column
                     align-items-center
                     text-center
                     position-relative
                     "
                >
                    <img
                        src={`https://avatars.dicebear.com/api/avataaars/${(
                            Math.random() + 1
                        )
                            .toString(36)
                            .substring(7)}.svg`}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width="65"
                        height="65"
                    />
                    <div className="mt-3">
                        <h4>{userById.name}</h4>
                        <p className="text-secondary mb-1"> {userById.profession.name}</p>
                        <CardRate userById={userById} />
                    </div>
                </div>
            </div>
        </div>
    );
};
UserCard.propTypes = {
    id: PropTypes.string.isRequired,
    userById: PropTypes.object.isRequired
};
export default UserCard;
