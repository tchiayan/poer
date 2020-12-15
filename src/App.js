import React from 'react';
import './App.css';
import PO from './PO';
import DO from './DO';
import ExcelPO from './ExcelPO';

// Bootstrap
import { Navbar , Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// React Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink
} from "react-router-dom"

function App(props) {

  return (
    <Router basename="poer">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>PDF Extract</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="po" activeStyle={{color:'white'}}>Purchase Order (PDF)</Nav.Link>
          <Nav.Link as={NavLink} to="do" activeStyle={{color:'white'}}>Delivery Order</Nav.Link>
          <Nav.Link as={NavLink} to="excelpo" activeStyle={{color:'white'}}>Purchase Order (Excel)</Nav.Link>
        </Nav>
      </Navbar>

      <div className="App">
        <Switch>
          <Route path="/po">
            <PO />
          </Route>
          <Route path="/do">
            <DO />
          </Route>
          <Route path="/excelpo">
            <ExcelPO />
          </Route>
          <Route path="/">
            <Redirect to={{pathname:"po"}} />
          </Route>
        </Switch>
      </div>
    </Router>

    
  );
}

export default App;
