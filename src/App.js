import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { SidebarHeader, SidebarContent, ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';

import Search from './routes/Search';
import Results from './routes/Results';
import Result from './routes/Result';
import AdminImport from './routes/admin/Admin.Import'
import AdminAdd from './routes/admin/Admin.add'
import AdminEdit from './routes/admin/Admin.edit'

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
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <Component {...routeProps}/>
       </React.Fragment>
  }}
  />
}

const NavLink = (props) => {
  var isActive = window.location.pathname === props.to
  return(
    
        <MenuItem active={isActive}>
          <Link {...props} style={isActive ? { color: "#d8d8d8" } : {}}>
              {props.children}
              </Link>
        </MenuItem>
    
  );
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
                    <NavLink to="/admin/add">Add Items</NavLink>
                    <NavLink to="/admin/edit">Edit Items</NavLink>
                    <NavLink to="/admin/import">Import Items</NavLink>
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
            <AdminRoute exact path={["/admin/add", "/admin"]} component={AdminAdd} />
            <AdminRoute exact path="/admin/edit" component={AdminEdit} />
            <SearchRoute exact path="/" component={Search} />
            <SearchRoute exact path={["/results/:search", "/results"]} component={Results} />
            <SearchRoute exact path={["/result/:search/:id", "/result/:id"]} component={Result} />
        </Switch>
      </div>

    </Router>
  );
}

export default App;
