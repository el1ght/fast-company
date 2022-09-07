import React, {useState, useEffect} from 'react';
import Pagination from '../../common/pagination';
import {paginate} from '../../../utils/paginate';
import GroupList from '../../common/groupList';
import api from '../../../api';
import SearchStatus from '../../ui/searchStatus';
import UsersTable from '../../ui/usersTable';
import _ from 'lodash';
import Loader from '../../../Loader/loader';
import TextField from '../../common/form/textField';
const UsersListPage = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [selectedSort, setSelectedSort] = useState({path: 'name', order: 'asc'});

    const [users, setUsers] = useState();
    const [search, setSearch] = useState('');

    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return {...user, bookmark: !user.bookmark};
                }
                return user;
            })
        );
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSearch('');
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    const handleSort = (item) => {
        setSelectedSort(item);
    };
    const handelSearch = (target) => {
        setSelectedProf();
        setSearch(target.value);
    };
    if (users) {
        const searchedUsers = search && users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));

        const filteredUsers = selectedProf
            ? users.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : users;

        const count = search ? searchedUsers.length : filteredUsers.length;
        const sortedUsers = _.orderBy(searchedUsers.length ? searchedUsers : filteredUsers, [selectedSort.path], [selectedSort.order]);

        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        return (
            <div style={{display: 'flex'}}>
                {professions && (
                    <div style={{margin: '10px'}}>
                        <GroupList
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            valueProperty='_id'
                            contentProperty='name'
                            selectedItem={selectedProf}
                        />
                        <button className='btn btn-primary btn-sm m-2' onClick={clearFilter}>Очистить</button>
                    </div>
                )}
                <div style={{margin: '10px'}}>
                    <SearchStatus length={count}/>
                    <TextField
                        name='search'
                        value={search}
                        onChange={handelSearch}
                        placeholder='Search...'
                        customStyle={true}
                    />
                    {count > 0 && (
                        <UsersTable
                            users={userCrop}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                            onSort={handleSort}
                            selectedSort={selectedSort}
                        />
                    )}
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return <div
        style={{height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Loader />
    </div>;
};
export default UsersListPage;
// searchedUsers || filteredUsers
