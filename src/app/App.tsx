import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import AddPage from './pages/AddPage/Add';
import Search from './pages/Search/Search';
import Edit from './pages/Edit/Edit';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/credential/add">
          <AddPage />
        </Route>
        <Route path="/credential/:service/edit">
          <Edit />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
