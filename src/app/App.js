import React from 'react';
import NavBar from './components/navBar';
import {Route, Switch} from 'react-router-dom';
import Main from './components/main';
import Login from './components/login';
import UsersList from './components/usersList';
function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route path='/login' component={Login} />
                <Route path='/users/:userId?' component={UsersList} />
            </Switch>
        </div>
    );
}

export default App;
