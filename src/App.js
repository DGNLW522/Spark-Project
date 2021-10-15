import React, { Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { BsBookHalf } from "react-icons/bs";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Main, Footer } from "./components/Layout";
import { NavBar, NavItem, NavLink } from "./components/Navbar";
import Spinner from "./components/Spinner";

import { DASHBOARD, CATALOG } from "./shared/routes";

const Dashboard = React.lazy(() => {
    return import("./containers/Dashboard/index");
});
const NotFound = React.lazy(() => {
    return import("./containers/404");
});

const theme = { 
    prime: {
        main: "#00ffea",
        light: "#42ffef",
        dark: "#42ffef",
        textColor: "#000",
        disabled: "#f3f3f3",
        danger: "#00ffb7",
        dangerDark: "#b0003a",
    },
    primary: {
        main: "#00ff8c",
        light: "#00ffb3",
        dark: "#00ffdd",
        textColor: "#000",
        disabled: "#f3f3f3",
        danger: "#00fff7",
        dangerDark: "#00b08d",
    },
    secondary: {
        main: "#9e9e9e",
        light: "#cfcfcf",
        dark: "#707070",
        textColor: "#000",
    },
    spacing:(factor) => `${factor*8}px`,
};

function App() {
    let routes = (
        <Suspense fallback={<Spinner />}>
            <Switch>
                <Route exact path={DASHBOARD} component={Dashboard} />
                <Route exact path={CATALOG} component={Spinner} />
                <Route exact path={"/"} component={Dashboard} />
                <Route component={NotFound} />
            </Switch>
        </Suspense>
    );

    return (
        <ThemeProvider theme={theme}>
            <NavBar>
                <NavItem>
                    <NavLink href={CATALOG}>
                        <BsBookHalf />
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href={CATALOG}>Catalog</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href={DASHBOARD}>Dashboard</NavLink>
                </NavItem>
            </NavBar>
            <Main>
                <Router>{routes}</Router>
            </Main>
            <Footer>
                Copyright {new Date().getFullYear()} © Naveen Lakshan{" "}
            </Footer>
        </ThemeProvider>
    );
}

export default App;