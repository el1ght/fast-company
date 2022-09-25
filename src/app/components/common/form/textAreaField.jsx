import React from 'react';
import PropTypes from 'prop-types';
const TextAreaField = ({onChange, value, name, error, label}) => {
    const getInputClasses = () => {
        return 'form-control' + (error ? ' is-invalid' : '');
    };
    const handleChange = ({target}) => {
        onChange({name: target.name, value: target.value});
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <textarea
                    value={value}
                    name={name}
                    className={getInputClasses()}
                    id="exampleFormControlTextarea1"
                    rows="3"
                    onChange={handleChange}
                ></textarea>
                {error && <div className='invalid-feedback'>{error}</div>}
            </div>
        </div>
    );
};
TextAreaField.propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};
export default TextAreaField;
