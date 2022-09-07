import React, {useState, useEffect} from 'react';
import {validator} from '../../utils/validator';
import TextField from '../common/form/textField';
import CheckBoxField from '../common/form/checkBoxField';
// import * as yup from 'yup';

const LoginForm = () => {
    const [data, setData] = useState({email: '', password: '', stayOn: false});
    const [errors, setErrors] = useState({});

    const handelChange = (target) => {
        if (target) {
            setData(prevSate => ({...prevSate, [target.name]: target.value}));
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    // const validateScheme = yup.object().shape({
    //     password: yup
    //         .string()
    //         .required('Пароль обязателен для заполнения')
    //         .matches(
    //             /(?=.*[A-Z])/,
    //             'Пароль должен содержать хотя бы одну заглавную букву'
    //         )
    //         .matches(
    //             /(?=.*[0-9])/,
    //             'Пароль должен содержать хотя бы одно число'
    //         )
    //         .matches(
    //             /(?=.*[!@#$%^&*])/,
    //             'Пароль должен содержать один из специальных символов !@#$%^&*'
    //         )
    //         .matches(
    //             /(?=.{8,})/,
    //             'Пароль долже состоять минимум из 8 символов'
    //         ),
    //     email: yup
    //         .string()
    //         .required('Электронная почта обязательна для заполнения')
    //         .email('Email введен не корректно')
    // });
    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Email введен не корректно'
            }
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения'
            },
            isCapitalSymbol: {
                message: 'Пароль должен содержать хотя бы одну заглавную букву'
            },
            isContainDigit: {
                message: 'Пароль должен содержать хотя бы одно число'
            },
            min: {
                message: 'Пароль долже состоять минимум из 8 символов',
                value: 8
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        // validateScheme
        //     .validate(data)
        //     .then(() => setErrors({}))
        //     .catch((err) => setErrors({[err.path]: err.message}));
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handelSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return null;
        }
        console.log(data);
    };
    return (
        <form onSubmit={handelSubmit}>
            <TextField
                onChange={handelChange}
                name='email'
                label='Электронная почта'
                value={data.email}
                error={errors.email}
            />
            <TextField
                onChange={handelChange}
                name='password'
                label='Пароль'
                type='password'
                value={data.password}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handelChange}
                name='stayOn'
            >
                Оставаться в системе
            </CheckBoxField>
            <button disabled={!isValid} className='btn btn-primary w-100 mx-auto mt-4'>Submit</button>
        </form>
    );
};
export default LoginForm;
