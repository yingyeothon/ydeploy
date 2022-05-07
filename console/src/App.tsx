import Authorization, {
  invalidAuthorization,
} from "./server/auth/Authorization";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AuthorizationContext from "./components/auth/AuthorizationContext";
import Home from "./pages/home/Home";
import LogInOutButton from "./components/auth/LogInOutButton";
import React from "react";
import requestGrant from "./server/auth/requestGrant";

function App() {
  const [authorization, setAuthorization] =
    React.useState<Authorization>(invalidAuthorization);

  React.useEffect(() => {
    requestGrant().then(setAuthorization).catch(alert);
  }, []);

  return (
    <div className="App">
      <LogInOutButton logged={authorization.memberId > 0} />
      <AuthorizationContext.Provider value={authorization}>
        <Router>
          <Routes>
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </AuthorizationContext.Provider>
    </div>
  );
}

export default App;
