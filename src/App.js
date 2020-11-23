import logo from './content/assets/images/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Search from './routes/Search';
import Results from './routes/Results';
import Result from './routes/Result';
import Import from './routes/Import';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Link className="navbar-brand" to="/"><img src={logo} alt="logo" className="mr-1" />Solar Gators Inventory</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto pr-4">
              <Link className="nav-link" to="/">Search</Link>
              <Link className="nav-link" to="/">Manage</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path={["/results/:search", "/results"]} component={Results} />
            <Route exact path="/import" component={Import} />
            <Route exact path={["/result/:search/:id", "/result/:id"]} component={Result} />
        </Switch>
      </div>

    </Router>
  );
}

export default App;
