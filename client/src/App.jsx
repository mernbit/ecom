import React, { useEffect } from "react";
import "./App.css";
import Routes from "./pages/route";
import { useAuthContext } from "./context/AuthContext";
const App = () => {
  const { isAuth } = useAuthContext();
  useEffect(() => {
    console.log(isAuth);
  }, [isAuth]);
  return (
    <div>
      <Routes />
    </div>
  );
};

export default App;
