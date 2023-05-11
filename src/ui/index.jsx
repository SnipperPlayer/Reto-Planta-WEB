import React, { useEffect } from "react";

import AppNav from "./nav";
import PageHome from "./page-home";
import PagePlants from "./page-plants";
import PageData from "./page-data";

export function App({}) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [page, setPage] = React.useState({
    route: "home",
  });

  useEffect(() => {
    if (currentUser) {
      setPage({ route: "plants" });
    }
  }, [currentUser]);

  return (
    <>
      <AppNav
        currentUser={currentUser}
        currentRoute={page.route}
        updateCurrentUser={setCurrentUser}
        onNavigate={setPage}
        onLogout={() => {
          setPage({ route: "home" });
          setCurrentUser(null);
        }}
      />

      {(({ route, data }) =>
        (route === "home" && (
          <PageHome
            onNavigate={setPage}
            currentUser={currentUser}
            data={data}
          />
        )) ||
        (route === "plants" && (
          <PagePlants
            onNavigate={setPage}
            currentUser={currentUser}
            data={data}
          />
        )) ||
        (route === "data" && (
          <PageData
            onNavigate={setPage}
            currentUser={currentUser}
            data={data}
          />
        )) ||
        (() => {
          throw new Error(`Invalid route: '${route}'`);
        })())(page)}
    </>
  );
}

export default App;
