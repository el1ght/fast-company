import React from 'react';
import PropTypes from 'prop-types';
const SelectField = ({label, value, onChange, defaultOption, options, error, name}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === 'object'
            ? Object.values(options)
            : options;
    const getInputClasses = () => {
        return 'form-select' + (error ? ' is-invalid' : '');
    };
    const handelChange = ({target}) => {
        onChange({name: target.name, value: target.value});
    };
    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handelChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                { optionsArray.length > 0 && optionsArray.map(option => (
                    <option
                        value={option.value}
                        key={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
};
SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.string,
    name: PropTypes.string
};
export default SelectField;
