import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Todo from "./pages/todo";



const App = () => {
    console.log('app')
    return (
        <Switch>
            <Route path="/" component={Todo} />
        </Switch>
    );
};

export default App;