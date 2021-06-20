import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { SidebarHeader, SidebarContent, ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import Search from './routes/Search';
import Results from './routes/Results';
import Result from './routes/Result';
import Import from './routes/Import';
import AdminImport from './routes/admin/Admin.Import'

import logo from './content/assets/images/logo.png';


const SearchRoute = ({exact, path, component:Component, ...rest}) => {
  return <Route exact={exact} path={path} {...rest} render={(routeProps) => {
     return <React.Fragment>
            <Navbar bg="light" expand="lg">
                <Link className="navbar-brand" to="/"><img src={logo} alt="logo" className="mr-1" />Solar Gators Inventory</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto pr-4">
                    <Link className="nav-link" to="/">Search</Link>
                    <Link className="nav-link" to="/admin">Manage</Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <Component {...routeProps}/>
       </React.Fragment>
  }}
  />
}

const AdminRoute = ({exact, path, component:Component, ...rest}) => {
  return <Route exact={exact} path={path} {...rest} render={(routeProps) => {
    return <React.Fragment>
            <ProSidebar breakPoint="md" className="position-absolute">
              <SidebarHeader>
                <div><h2 className="text-center">Inventory Admin</h2></div>
              </SidebarHeader>
              <SidebarContent>
                <Menu iconShape="square" className="h3">
                  {/* <SubMenu title="Components" > */}
                    <MenuItem>Add Items</MenuItem>
                    <MenuItem>Edit Items</MenuItem>
                    <MenuItem active>Import Items</MenuItem>
                </Menu>
              </SidebarContent>
            </ProSidebar>
            <main className="h-100">
              <Component {...routeProps}/>
            </main>
          </React.Fragment>
  }}
  />
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
            <AdminRoute exact path="/admin/import" component={AdminImport} />
            <SearchRoute exact path="/" component={Search} />
            <SearchRoute exact path={["/results/:search", "/results"]} component={Results} />
            <SearchRoute exact path={["/result/:search/:id", "/result/:id"]} component={Result} />
        </Switch>
      </div>

    </Router>
  );
}

export default App;
