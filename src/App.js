import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.less';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
          <Redirect to='/login' />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
