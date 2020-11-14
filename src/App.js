import logo from './content/assets/images/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Search from './routes/Search';
import Results from './routes/Results';
import Import from './routes/Import';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/"><img src={logo} alt="logo" className="mr-1" />Solar Gators Inventory</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto pr-4">
              <Nav.Link href="#home">Search</Nav.Link>
              <Nav.Link href="#link">Manage</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path={["/results/:search", "/results"]} component={Results} />
            <Route exact path="/import" component={Import} />
        </Switch>
      </div>

    </Router>
  );
}

export default App;
