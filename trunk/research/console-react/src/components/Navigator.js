import i18n from "i18next";
import React, { useState } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { LanguageOptions } from "../utils";

export function Navigator() {
    const {t} = useTranslation();
    //const [navs, setNavs] = useState();
    const location = useLocation();
    const [lang, setLang] = useState('zh');

    const handleSelectLang = function(e) {
        setLang(e);
        i18n.changeLanguage(e);
    };

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
                <Nav.Link to={"/connect"} as={Link}>{t("nav.connect")}</Nav.Link>
                <Nav.Link to={"/summaries"} as={Link}>{t("nav.summaries")}</Nav.Link>
                <Nav.Link to={"/vhosts"} as={Link}>{t("nav.vhosts")}</Nav.Link>
                <Nav.Link to={"/streams"} as={Link}>{t("nav.streams")}</Nav.Link>
                <Nav.Link to={"/clients"} as={Link}>{t("nav.clients")}</Nav.Link>
                <Nav.Link to={"/configs"} as={Link}>{t("nav.configs")}</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <NavDropdown title={LanguageOptions[lang]} id="navLang" onSelect={(e) => handleSelectLang(e)}>
                  <NavDropdown.Item eventKey="en" active={lang === "en"}>English</NavDropdown.Item>
                  <NavDropdown.Item eventKey="zh" active={lang === "zh"}>简体中文</NavDropdown.Item>
                </NavDropdown>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}