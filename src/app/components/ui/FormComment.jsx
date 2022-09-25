import React, {useEffect, useState} from 'react';
import SelectField from '../common/form/selectField';
import api from '../../api';
import PropTypes from 'prop-types';
import {validator} from '../../utils/validator';
import TextAreaField from '../common/form/textAreaField';

const FormComment = ({handleAddComment}) => {
    const [data, setData] = useState({userId: '', content: ''});
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});
    const validatorConfig = {
        userId: {
            isRequired: {
                message: 'Выбирите имя пользователя'
            }
        },
        content: {
            isRequired: {
                message: 'Сообщение не может быть пустым'
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data.map(user => ({value: user._id, label: user.name}))));
    }, []);
    const handleChange = (item) => {
        setData(prevState => ({...prevState, [item.name]: item.value}));
    };

    const handleSendData = () => {
        const isValid = validate();
        if (!isValid) return;
        handleAddComment(data);
        setData({userId: '', content: ''});
        setErrors({});
    };
    return (
        <div>
            <h2>New comment</h2>
            <SelectField
                defaultOption='Выбирите пользователя'
                value={data.userId}
                name='userId'
                options={users}
                onChange={handleChange}
                error={errors.userId}
            />
            <TextAreaField
                onChange={handleChange}
                value={data.content}
                label='Сообщение'
                error={errors.content}
                name='content'
            />
            <button
                className="btn btn-primary"
                style={{alignSelf: 'flex-end'}}
                onClick={handleSendData}
            >
              Опубликовать
            </button>
        </div>
    );
};
FormComment.propTypes = {
    handleAddComment: PropTypes.func.isRequired
};

export default FormComment;
