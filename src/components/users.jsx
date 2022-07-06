import React, { useState } from "react";
import api from "../api";
const rate = 5;

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const getQualities = (user) => {
        return (
            user.qualities.map((quality) => (
                    <span key={quality._id} className={'badge m-1 bg-' + quality.color}>{quality.name}</span>
                )
            )
        )
    }

    const getTableBody = () => {
        return users.map((user) => {
            return (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{getQualities(user)}</td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{`${user.rate}/${rate}`}</td>
                    <td>
                        <button className='btn btn-danger' onClick={() => handleDelete(user)}>delete</button>
                    </td>
                </tr>
            )
        })
    }

    const renderPhrase = (number) => {
        const lastNumber = Number(number.toString().slice(-1));
        if (number > 4 && number < 14) {
            return <span className='badge bg-primary'>{users.length} человек тусанет с тобой сегодня</span>
        } else if (lastNumber === 1) {
            return <span className='badge bg-primary'>{users.length} человек тусанет с тобой сегодня</span>
        } else if (number === 2 || number === 3 || number === 4) {
            return <span className='badge bg-primary'>{users.length} человека тусанут с тобой сегодня</span>
        } else if (lastNumber === 2 || lastNumber === 3 || lastNumber === 4) {
            return <span className='badge bg-primary'>{users.length} человека тусанут с тобой сегодня</span>
        }  else if (number === 0) {
            return <span className='badge bg-danger'>Никто с тобой не тусанет((</span>
        } else {
            return <span className='badge bg-primary'>{users.length} человек тусанет с тобой сегодня</span>
        }
    };

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user !== userId))
        renderPhrase(users.length)
    };
    return (
        <>
            <h2>
                {renderPhrase(users.length)}
            </h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                        {getTableBody()}
                </tbody>
            </table>
        </>
    );
}
export default Users;