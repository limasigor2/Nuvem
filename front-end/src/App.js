import { Router } from "react-router-dom";

import Routes from './routes';
import history from './utils/history';

import './styles/global.scss';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
