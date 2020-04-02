import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import search from './pages/search';
import repositories from './pages/repositories';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={search}/>
                <Route path="/repositories" exact component={repositories}/>
            </Switch>
        </BrowserRouter>
    );
}
