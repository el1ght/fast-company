import React from 'react';
import PropTypes from 'prop-types';
import { useProfession } from '../../hooks/useProfession';
const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfession();
    const prof = getProfession(id);
    if (!isLoading) return <p>{prof.name}</p>;
    else return <h1>loading...</h1>;
};
Profession.propTypes = {
    id: PropTypes.string.isRequired
};
export default Profession;
