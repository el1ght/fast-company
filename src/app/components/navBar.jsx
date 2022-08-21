import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
        <ul style={{display: 'flex', gap: '40px', listStyle: 'none'}}>
            <li><Link style={{textDecoration: 'none'}} to='/'>Main</Link></li>
            <li><Link style={{textDecoration: 'none'}} to='/login'>Login</Link></li>
            <li><Link style={{textDecoration: 'none'}} to='/users'>Users</Link></li>
        </ul>
    );
};
export default NavBar;
