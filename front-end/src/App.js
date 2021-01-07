import { Router } from "react-router-dom";

import Header from './components/Header/header';
import Routes from './routes';
import Footer from './components/Footer/footer';

import history from './utils/history';

import './styles/global.scss';

function App() {
  return (
    <div className="app-container">
      <Router history={history}>
        <Header />
        <Routes />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
