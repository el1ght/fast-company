import React from "react";
import PropTypes from "prop-types";

const UserSearch = ({ value, onChange }) => {
    return (
        <div className="container">
            <input
                className="form-control"
                type="text"
                placeholder="Search..."
                value={value}
                onChange={onChange}
            ></input>
        </div>
    );
};

UserSearch.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default UserSearch;
