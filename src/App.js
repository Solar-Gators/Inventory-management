import logo from './content/assets/images/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home"><img src={logo} alt="logo" />Solar Gators Inventory</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto pr-4">
            <Nav.Link href="#home">Search</Nav.Link>
            <Nav.Link href="#link">Manage</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Row className="align-items-center">>
        <Col md={{offset: 4, span: 4}}>
          <Form>
            <Form.Group controlId="formSearch">
              <Form.Control type="text" placeholder="Search" />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default App;
