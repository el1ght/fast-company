import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';
import { useQualities } from '../../../hooks/useQualities';

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQualities } = useQualities();
   if (!isLoading) {
 return (
        <>
            {qualities.map((qual) => (
                <Quality key={qual} {...getQualities(qual)} />
            ))}
        </>
    );
   } else {
      return <h1>Loading...</h1>;
   }
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
