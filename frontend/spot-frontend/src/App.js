import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router";

//pages
import HomePage from "./pages/homePage"
import PageNotFound from "./pages/pageNotfound"
import SignUp from "./pages/signUp"
import LogIn from "./pages/logIn"
import ManagerLogIn from "./pages/managerLogin"
import ManagerSignUp from "./pages/managerSignup"
import Faq from "./pages/faq"
import ContactPage from "./pages/contactPage"
import PaymentPage from './pages/paymentPage';
import UserPassManagement from './pages/userPassmanagement'
import UserVehicleManagement from './pages/userVehiclemanagement'
import UserServicesManagement from './pages/userServicesmanagement'
import UserDashBoardPage from "./pages/userDashboard"
import ManagerDashBoardPage from "./pages/managerDashboard"
import ManageLots from "./pages/manageLots"
import ManagerPassManagement from "./pages/managerPassmanagement"
import ViewLotInfo from "./pages/lotInfo"
import EditLots from "./pages/editLotPage"
import EditPasses from "./pages/editPassPage"


//components


class App extends React.Component {
  render (){
    return <Router>
      <Switch>
        <Route exact path="/" component ={HomePage} />

        <Route exact path="/404Error" component={PageNotFound} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/managersignup" component={ManagerSignUp} />
        <Route exact path="/managerlogin" component={ManagerLogIn} />
        <Route exact path="/faq" component={Faq} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/payment" component={PaymentPage} />
        <Route exact path="/userdashboard" component={UserDashBoardPage} />
        <Route exact path="/uservehiclemanagement" component={UserVehicleManagement} />
        <Route exact path="/userpassmanagement" component={UserPassManagement} />
        <Route exact path="/userservicesmanagement" component={UserServicesManagement} />
        <Route exact path="/managerdashboard" component={ManagerDashBoardPage} />
        <Route exact path="/managelots" component={ManageLots} />
        <Route exact path="/managerpassmanagement" component={ManagerPassManagement} />
        <Route exact path="/viewlotinfo" component={ViewLotInfo} />
        <Route exact path="/editlotinfo" component={EditLots} />
        <Route exact path="/editpassinfo" component={EditPasses} />


        <Redirect to="/404Error"/>
      </Switch>
    </Router>
  }
}

export default App;