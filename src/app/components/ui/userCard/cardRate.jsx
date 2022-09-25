import React from 'react';
import PropTypes from 'prop-types';
const CardRate = ({userById}) => {
    return (
        <div className="text-muted">
            <i
                className="
                 bi bi-caret-down-fill
                 text-primary
                  "
                role="button"
            ></i>
            <i
                className="
                bi bi-caret-up
                text-secondary
                  "
                role="button"
            ></i>
            <span className="ms-2">{userById.rate}</span>
        </div>
    );
};
CardRate.propTypes = {
    userById: PropTypes.object.isRequired
};
export default CardRate;
