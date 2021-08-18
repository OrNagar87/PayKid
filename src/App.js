import logo from "./logo.svg";
import "./App.css";
import React, { Children, useState, useContext } from "react";
import KidContext from "./components/KidContext";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Users from "./components/Users/Users";

import { ConfigProvider } from "antd";

function App() {
  const Provider = KidContext.Provider;

  const globalState = [
    {
      id: 11,
      name: "צור שלום",
      income: 50,
      spend: 0,
      data: [],
    },
    {
      id: 12,
      name: "ידידיה יוסף",
      income: 40,
      spend: 20,
      data: [],
    },
    {
      id: 13,
      name: "יצחק",
      income: 30,
      spend: 0,
      data: [],
    },
  ];

  const [changeKids, setChangeKids] = useState(globalState);
  const [change, setChange] = useState(globalState);

  return (
    <ConfigProvider direction="rtl">
      <Router>
        <div>
          <Switch>
            <Provider value={{ changeKids, setChangeKids }}>
              <Route path="/user/:idParam">
                <Users />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Provider>
          </Switch>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
