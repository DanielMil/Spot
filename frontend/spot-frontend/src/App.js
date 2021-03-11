
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
import UserDashBoardPage from "./pages/userDashboard"
import GuestPage from "./pages/guestPage"
import GuestCheckoutPage from './pages/guestCheckoutPage'
import UserPassManagement from './pages/userPassmanagement'
import UserVehicleManagement from './pages/userVehiclemanagement'
import UserServicesManagement from './pages/userServicesmanagement'
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
        <Route exact path="/userdashboard" component={UserDashBoardPage} />
        <Route exact path="/guest" component={GuestPage} />
        <Route exact path="/guestcheckout" component={GuestCheckoutPage} />
        <Route exact path="/uservehiclemanagement" component={UserVehicleManagement} />
        <Route exact path="/userpassmanagement" component={UserPassManagement} />
        <Route exact path="/userservicesmanagement" component={UserServicesManagement} />
        
        
        
        
        
        <Redirect to="/404Error"/>
      </Switch>
    </Router>
  }
}

export default App;

