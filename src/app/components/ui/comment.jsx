import React, {useEffect, useState} from 'react';
import api from '../../api';
import {getTime} from '../../utils/visitTime';
import PropTypes from 'prop-types';

const Comment = ({comment, handleRemove}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data.map(user => ({value: user._id, label: user.name}))));
    }, []);

    const getName = (id) => {
        const user = users.find(user => user.value === id);
        return user.label;
    };
    return (
        <div
            className="bg-light card-body mb-3"
        >
            <div className="row">
                {users.length > 0
                    ? <div className="col">
                        <div className="d-flex flex-start">
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
                            <div
                                className="
                                  flex-grow-1 flex-shrink-1
                                   "
                            >
                                <div className="mb-4">
                                    <div
                                        className="
                                         d-flex
                                         justify-content-between
                                         align-items-center
                                         "
                                    >
                                        <p className="mb-1">
                                            {getName(comment.userId) + ' '}
                                            <span className="small">
                                             - {getTime(comment.created_at)}
                                            </span>
                                        </p>
                                        <button
                                            className="
                                             btn btn-sm
                                             text-primary
                                             d-flex
                                             align-items-center
                                              "
                                            onClick={() => handleRemove(comment._id)}
                                        >
                                            <i
                                                className="
                                                bi bi-x-lg
                                                "
                                            ></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <p>loading...</p>}
            </div>
        </div>
    );
};
Comment.propTypes = {
    comment: PropTypes.object,
    handleRemove: PropTypes.func.isRequired
};
export default Comment;
