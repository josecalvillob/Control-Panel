import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";
import AddClient from "./components/clients/AddClient";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/client/add" component={AddClient} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
