import React, {useState, useEffect} from 'react';
import {validator} from '../../utils/validator';
import TextField from '../common/form/textField';
import api from '../../api';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';
const RegisterForm = () => {
    const [data, setData] = useState({email: '', password: '', profession: '', sex: 'male', qualities: [], licence: false});
    const [professions, setProfessions] = useState({});
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});

    const handelChange = (target) => {
        if (target) {
            setData(prevSate => ({...prevSate, [target.name]: target.value}));
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

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
        },
        profession: {
            isRequired: {
                message: 'Обязательно выбирите вашу профессию'
            }
        },
        licence: {
            isRequired: {
                message: 'Вы не можете использовать наш сервис без подтверждения лицензионного подтверждения'
            }
        }
    };
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return {_id: prof.value, name: prof.label};
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handelSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const {profession, qualities} = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
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
            <SelectField
                name='profession'
                onChange={handelChange}
                options={professions}
                defaultOption='Choose...'
                label='Выберите вашу профессию'
                value={data.profession}
                error={errors.profession}
            />
            <RadioField options={[
                {name: 'Male', value: 'male'},
                {name: 'Female', value: 'female'},
                {name: 'Other', value: 'other'}
            ]}
            onChange={handelChange}
            name='sex'
            label='Укажите ваш пол'
            value={data.sex}
            />
            <MultiSelectField
                options={qualities}
                onChange={handelChange}
                name='qualities'
                label='Выберите ваши качества'
                dafaultValue={data.qualities}
            />
            <CheckBoxField
                value={data.licence}
                onChange={handelChange}
                name='licence'
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button disabled={!isValid} className='btn btn-primary w-100 mx-auto mt-4'>Submit</button>
        </form>
    );
};
export default RegisterForm;
