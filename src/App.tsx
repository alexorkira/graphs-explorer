import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import LoginPage from './pages/Login/LoginPage';
import ContextStore from './store';

const App = () => {
    const sessionToken = ContextStore.useStoreState((store) => store.sessionToken);

    return (
      <div className="App">
        <Router basename='/'>
            <Switch>
                {sessionToken 
                    ?<Route path="/graphs" exact><div>TBD: Show the graphs</div></Route>
                    : <Route path="/login" exact component={LoginPage} />
                }
                <Route path="/">
                    <Redirect to={`${sessionToken ? '/graphs' : '/login'}`} />
                </Route>
            </Switch>
        </Router>
    </div>
);

}

export default App;
