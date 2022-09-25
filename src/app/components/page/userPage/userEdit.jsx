import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import {validator} from '../../../utils/validator';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import {useHistory} from 'react-router-dom';
import BackButton from '../../common/table/backButton';

const UserEdit = ({id}) => {
    // useEffect(() => {
    //     setDate();
    // }, [edit]);

    useEffect(() => {
        api.users.getById(id).then(data => {
            setData({
                name: data.name,
                email: data.email,
                profession: data.profession._id,
                sex: data.sex,
                qualities: (data.qualities).map(qual => (
                    {
                        label: qual.name,
                        value: qual._id
                    }
                ))
            });
        });
    }, []);

    const history = useHistory();
    const [professions, setProfessions] = useState({});
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});
    const [data, setData] = useState();

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
        name: {
            isRequired: {
                message: 'Имя обязательно для заполнения'
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
        const updatedUser = {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        };
        api.users.update(id, updatedUser).then(user => console.log(user));
        history.push(`/users/${id}`);
    };
    return (
        <div className='container mt-5'>
            {/* <Link to={`/users/${id}`}><button className="btn btn-primary">Назад</button></Link> */}
            <BackButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {
                        (Object.keys(professions).length !== 0 &&
                            Object.keys(qualities).length !== 0)
                            ? (
                                <form onSubmit={handelSubmit}>
                                    <TextField
                                        onChange={handelChange}
                                        name='name'
                                        label='Имя'
                                        value={data.name}
                                        error={errors.name}
                                    />
                                    <TextField
                                        onChange={handelChange}
                                        name='email'
                                        label='Электронная почта'
                                        value={data.email}
                                        error={errors.email}
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
                                        defaultValue={data.qualities}
                                    />
                                    <button disabled={!isValid} className='btn btn-primary w-100 mx-auto mt-4'>Обновить</button>
                                </form>
                            )
                            : <h2>Loading...</h2>
                    }
                </div>
            </div>
        </div>
    );
};

UserEdit.propTypes = {
    id: PropTypes.string.isRequired
};
export default UserEdit;
