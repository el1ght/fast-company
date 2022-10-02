import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import professionService from '../services/profession.service';
import { toast } from 'react-toastify';
const ProfessionContext = React.createContext();

export const useProfession = () => {
    return useContext(ProfessionContext);
};

 export const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getProfessionsList = async () => {
            try {
                const { content } = await professionService.get();
                setProfessions(content);
                setLoading(false);
            } catch (err) {
                errCatcher();
            }
        };
        getProfessionsList();
    }, []);

    useEffect(() => {
        if (error === null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    const getProfession = (id) => {
       return professions.find(profession => profession._id === id);
    };

    const errCatcher = (err) => {
        const { message } = err.response.data;
        setError(message);
    };
    return <ProfessionContext.Provider value={{ isLoading, professions, getProfession }}>
        { children }
    </ProfessionContext.Provider>;
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
