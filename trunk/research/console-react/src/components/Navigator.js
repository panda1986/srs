import React, { useState } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export function Navigator() {
    //const [navs, setNavs] = useState();
    const location = useLocation();

    React.useEffect(() => {
        console.log(`nav location=${JSON.stringify(location)}`);
        // setNavs([
        //     {eventKey: '1', to:'/zh/connect', text:'ConnectSRS'}
        // ])
    }, [location]);

    return(
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="https://github.com/ossrs/srs">
              <img 
                src="/favicon.ico"
                width="36"
                height="36"
                className="d-inline-block align-top"
              ></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" variant="pills">
                <Nav.Link to={"/connect"} as={Link}>ConnectSRS</Nav.Link>
                <Nav.Link to={"/summaries"} as={Link}>Overview</Nav.Link>
                <Nav.Link to={"/vhosts"} as={Link}>Vhosts</Nav.Link>
                <Nav.Link to={"/streams"} as={Link}>Streams</Nav.Link>
                <Nav.Link to={"/clients"} as={Link}>Clients</Nav.Link>
                <Nav.Link to={"/configs"} as={Link}>Configs</Nav.Link>
                <Nav.Link to={"/dvr"} as={Link}>Dvr</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}