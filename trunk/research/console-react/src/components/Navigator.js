import i18n from "i18next";
import React, { useState } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { LanguageOptions } from "../utils";

export function Navigator() {
    const {t} = useTranslation();
    const [lang, setLang] = useState('zh');
    const location = useLocation();
    const navs = [
      {eventKey: '1', to:'/summaries', text: "nav.summaries"},
      {eventKey: '2', to:'/vhosts', text: "nav.vhosts"},
      {eventKey: '3', to:'/streams', text: "nav.streams"},
      {eventKey: '4', to:'/clients', text: "nav.clients"},
      {eventKey: '5', to:'/configs', text: "nav.configs"}
    ];
    const [activeKey, setActiveKey] = useState(0);

    const handleSelectLang = function(e) {
      setLang(e);
      i18n.changeLanguage(e);
    };

    React.useEffect(() => {
      navs.map((e) => {
        if (location.pathname.indexOf(e.to) >= 0) {
            setActiveKey(e.eventKey);
            console.log('set event key', e.eventKey, e.to, ' active');
        }
        return e;
      });
    }, []);

    return(
      <>
        <Navbar>
          <Container className={{color:'#fff'}}>
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
              <Nav variant="pills" activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
                  {navs.map((e, index) => {
                    return (
                      <Nav.Link eventKey={e.eventKey} as={Link} to={e.to} key={index}>
                        {t(e.text)}
                      </Nav.Link>
                    )
                  })}
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
      </>
    )
}