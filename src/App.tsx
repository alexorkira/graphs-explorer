import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import DashboadPage from './pages/Dashboard/DashboardPage';
import LoginPage from './pages/Login/LoginPage';
import ContextStore from './store';

const App = () => {
    let sessionToken = ContextStore.useStoreState((store) => store.session.token);
    if (String(process.env.REACT_APP_STANDALONE_MODE) === 'on') {
        sessionToken = 'standalone-mode';
    }

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
};

export default App;
