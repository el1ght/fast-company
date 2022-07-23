import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const maxRate = 5;

const User = ({ _id, name, qualities, profession, completedMeetings, rate, onDelete, bookmark, onToggleBookMark }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map((quality) => (
                    <Qualitie key={quality._id} {...quality} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate} /{maxRate}</td>
            <td>
                <BookMark status={bookmark} onClick={() => onToggleBookMark(_id)} />
            </td>
            <td>
                <button className='btn btn-danger' onClick={() => onDelete(_id)}>delete</button>
            </td>
        </tr>
    )
}

export default User;