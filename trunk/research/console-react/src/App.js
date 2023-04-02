import React, { Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes, Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import { Clients } from "./pages/Clients";
import { Configs } from "./pages/Config";
import {ConnectSRS} from "./pages/ConnectSRS";
import {ErrorPage} from "./pages/ErrorPage";
import { Overview } from "./pages/Overview";
import { Streams } from "./pages/Streams";
import { Vhosts } from "./pages/Vhosts";
import { Login } from "./pages/Login";
import { Navigator } from "./components/Navigator";
import { Container } from "react-bootstrap";
import resourceZh from "./resources/locale/zh.json";
import resourceEn from "./resources/locale/en.json";

import i18n from "i18next";
import { initReactI18next, Trans, useTranslation } from 'react-i18next';
import { Vhost } from './pages/Vhost';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        en: {translation: resourceEn.translation},
        zh: {translation: resourceZh.translation}
      },
      lng: "zh",
      fallbackLng: "zh",
      interpolation: {escapeValue: false},
    });

function App() {
  // const {t} = useTranslation();
  // const [count, setCount] = useState(0);
  // const changeLan = (e) => {
  //     i18n.changeLanguage(e.target.value);
  //     setCount((prev) => prev + 1);
  // }
  return (
    <Suspense fallback="Loading">
      {/* <h1>{t("nav.connect")}</h1>
      <p>
        <Trans components={{bold1: <b></b>, italic1: <i></i>}}>sample</Trans>
      </p>
      <p>{t("changed", {count})}</p> */}
      <BrowserRouter>
        <Navigator></Navigator>
        <Routes>
          <Route path="/" element={<Root></Root>}/>
          <Route path=":locale" element={<Locale></Locale>}>
            <Route path="login" element={<Login></Login>}></Route>
            <Route path="connect" element={<ConnectSRS></ConnectSRS>}></Route>
            <Route path="summaries" element={<Overview></Overview>}></Route>
            <Route path="vhosts">
              <Route index={true} element={<Vhosts></Vhosts>}></Route>
              {/* support multiple nested routes: https://stackoverflow.com/questions/64291991/nested-routing-is-not-working-in-react-router-v6 */}
              <Route path=":vhostId" element={<Vhost></Vhost>}></Route>
            </Route>
            <Route path="streams" element={<Streams></Streams>}></Route>
            <Route path="clients" element={<Clients></Clients>}></Route>
            <Route path="configs" element={<Configs></Configs>}></Route>
          </Route>
          <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
        </Routes>
        <Container>
          <footer>our footer</footer>
        </Container>
      </BrowserRouter>
    </Suspense>
  );
}

function Locale() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
      console.log(`locale, location=${JSON.stringify(location)}, params=${JSON.stringify(params)}`);
      if (params.locale === 'zh') {
        return;
      }
      const to ={pathname: `/zh/${params.locale}`, search: ""};
      return navigate(to);
  }, [navigate, location, params]);

  return(
    <Container>
      <Outlet></Outlet>
    </Container>
  )
}

function Root() {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    console.log(`Jump to /zh/login by root,location=${JSON.stringify(location)}`);
    const to = {pathname: `/zh/login`, search: ""};
    navigate(to);
  }, [navigate, location])

  return (
    <>
    </>
  )
}

export default App;
