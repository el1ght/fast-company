import React from 'react';
import PropTypes from 'prop-types';
const CheckBoxField = ({name, value, onChange, children, error}) => {
    const getInputClasses = () => {
        return 'form-check-label' + (error ? ' is-invalid' : '');
    };
    const handelChange = (e) => {
        onChange({name, value: !value});
    };
    return (
        <div className="mt-4">
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id={name} onChange={handelChange} checked={value} />
                <label className={getInputClasses()} htmlFor={name}>
                    {children}
                </label>
                {error && (
                    <div className="invalid-feedback">{error}</div>
                )}
            </div>
        </div>
    );
};
CheckBoxField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    error: PropTypes.string
};
export default CheckBoxField;
