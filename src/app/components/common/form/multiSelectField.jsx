import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
const MultiSelectField = ({options, onChange, name, label, defaultValue}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === 'object'
            ? Object.values(options)
            : options;
    const handelChange = (value) => {
        console.log(value);
        onChange({name, value});
    };
    return (
        <div className="mt-4">
            <label className="form-label">
                {label}
            </label>
            <Select
                isMulti
                defaultValue={defaultValue}
                closeMenuOnSelect={false}
                options={optionsArray}
                className='basic-multi-select'
                classNamePrefix='select'
                onChange={handelChange}
                name={name}
            />
        </div>
    );
};
MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};
export default MultiSelectField;
