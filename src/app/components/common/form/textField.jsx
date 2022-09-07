import React, {useState} from 'react';
import PropTypes from 'prop-types';
import style from './textFieldStyle/textField.module.css';
const TextField = ({label, type, value, name, error, onChange, placeholder, customStyle}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handelChange = ({target}) => {
        onChange({name: target.name, value: target.value});
    };
    const getInputClasses = () => {
        return 'form-control' + (error ? ' is-invalid' : '');
    };
    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };
    return (
        <>
            {customStyle
                ? <div className={style.wrapper}>
                    <input
                        name={name}
                        type={type}
                        value={value}
                        placeholder={placeholder}
                        id={name}
                        onChange={handelChange}
                        className={style.input}
                    />
                </div>
                : <div className='mb-4'>
                    <label htmlFor={name}>{label}</label>
                    <div className="input-group has-validation">
                        <input
                            name={name}
                            type={showPassword ? 'text' : type}
                            value={value}
                            placeholder={placeholder}
                            id={name}
                            onChange={handelChange}
                            className={getInputClasses()}
                        />
                        {type === 'password' && (
                            <button
                                onClick={toggleShowPassword}
                                className='btn btn-outline-secondary'
                            >
                                <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
                            </button>
                        )}
                        {error && <div className='invalid-feedback'>{error}</div>}
                    </div>
                </div>}

        </>
    );
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    customStyle: PropTypes.bool
};
TextField.defaultProps = {
    type: 'text',
    placeholder: '',
    label: '',
    customStyle: false
};
export default TextField;
