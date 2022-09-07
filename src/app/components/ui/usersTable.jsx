import React from 'react';
import PropTypes from 'prop-types';
import BookMark from '../common/bookmark';
import Qualities from './qualities/index';
import Table from '.././common/table/index';
import {Link} from 'react-router-dom';
const UsersTable = ({users, onSort, selectedSort, onToggleBookMark, onDelete, ...rest}) => {
    const columns = {
        name: {
            path: 'name',
            name: 'Имя',
            component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
        },
        qualities: {
            name: 'Качества',
            component: (user) => (
                <Qualities qualities={user.qualities}/>
            )
        },
        profession: {path: 'profession.name', name: 'Профессия'},
        completedMeetings: {path: 'completedMeetings', name: 'Встретился, раз'},
        rate: {path: 'rate', name: 'Оценка'},
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };
    return (
        <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users}>
        </Table>
    );
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    rest: PropTypes.object,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
export default UsersTable;
