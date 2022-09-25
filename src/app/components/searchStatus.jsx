import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const renderPhrase = (length) => {
        const lastOne = Number(length.toString().slice(-1));
        if (length > 4 && length < 15) return "человек тусанет";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
        if (lastOne === 1) return "человек тусанет";
        return "человек тусанет";
    };

    return (
        <>
            <h2>
                <span
                    className={
                        "badge " + (length > 0 ? "bg-primary" : "bg-danger")
                    }
                >
                    {length > 0
                        ? `${
                            length + " " + renderPhrase(length)
                        } с тобой сегодня`
                        : "Никто с тобой не тусанет(("}
                </span>
            </h2>
        </>
    );
};
SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
