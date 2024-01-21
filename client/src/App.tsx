import { Switch, Route, Redirect } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

import Companies from "./pages/companies/Companies";
import Heading from "./components/Heading/Heading";
import CompanyOffices from "./pages/companyOffices/CompanyOffices";

function App() {
  const routes = (
    <Switch>
      <Route exact path="/" component={Companies} />
      <Route exact path="/company/:companyId" component={CompanyOffices} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className="container">
      <Heading />
      <ToastContainer
        // autoClose={false}
        // position="top-center"
        // className="toast-container"
        // toastClassName="dark-toast"
        theme="colored"
      />
      <section>{routes}</section>
    </div>
  );
}

export default App;
