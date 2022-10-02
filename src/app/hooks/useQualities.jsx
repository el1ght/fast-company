import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import QualitiesService from '../services/qualities.service';
import { toast } from 'react-toastify';
const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getQualitiesList = async () => {
            try {
                const { content } = await QualitiesService.get();
                setQualities(content);
                setLoading(false);
            } catch (err) {
                errCatcher(err);
            }
        };
        getQualitiesList();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    const getQualities = (id) => {
        return qualities.find(quality => quality._id === id);
    };
    const errCatcher = (err) => {
        const { message } = err.response.data;
        setError(message);
    };

    return <QualitiesContext.Provider value={{ isLoading, getQualities }}>
        {children}
    </QualitiesContext.Provider>;
};
QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
