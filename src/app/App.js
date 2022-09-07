import React from 'react';
import NavBar from './components/ui/navBar';
import {Route, Switch} from 'react-router-dom';
import Main from './layout/main';
import Login from './layout/login';
import Users from './layout/users';
function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route path='/login/:type?' component={Login} />
                <Route path='/users/:userId?/:edit?' component={Users} />
            </Switch>
        </div>
    );
}

export default App;
