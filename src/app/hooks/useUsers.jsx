import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { content } = await userService.get();
                setUsers(content);
                setLoading(false);
            } catch (err) {
               errCatcher(err);
            }
        };
        getUsers();
    }, []);

    useEffect(() => {
      if (error !== null) {
         toast.error(error);
         setError(null);
      }
    }, [error]);

    function errCatcher(err) {
            const { message } = err.response.data;
            setError(message);
    }

    return <UserContext.Provider value={{ users }}>
        {!isLoading ? children : <h1>Loading..</h1>}
    </UserContext.Provider>;
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
