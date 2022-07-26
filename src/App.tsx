import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import DashboadPage from './pages/Dashboard/DashboardPage';
import LoginPage from './pages/Login/LoginPage';
import ContextStore from './store';

const App = () => {
    const sessionToken = ContextStore.useStoreState((store) => store.sessionToken);
  
    return (
        <div className="App">
          {sessionToken 
              ? <DashboadPage />
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
