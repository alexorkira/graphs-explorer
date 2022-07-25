import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import LoginPage from './pages/Login/LoginPage';
import ContextStore from './store';

const App = () => {
    const sessionToken = ContextStore.useStoreState((store) => store.sessionToken);
    const logout = ContextStore.useStoreActions((actions) => actions.logout);

    return (
        <div className="App">
          {sessionToken 
              ? <div>TBD: Show the graphs<button onClick={() => logout(sessionToken!)}>LOGOUT</button></div>
              : <LoginPage />
          }
          <Router basename='/'>
              <Switch>
                  <Route path="/">
                      <Redirect to={`${sessionToken ? '/graphs' : '/login'}`} />
                  </Route>
              </Switch>
          </Router>
        </div>
    );
}

export default App;
