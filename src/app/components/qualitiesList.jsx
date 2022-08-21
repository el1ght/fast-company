import React from 'react';
import Qualitie from './qualitie';
import PropTypes from 'prop-types';
const QualitiesList = ({qualities}) => {
    return (
        <div style={{width: '270px'}}>
            {qualities.map((qual) => (
                <Qualitie key={qual._id} {...qual} />
            ))}
        </div>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};
export default QualitiesList;
