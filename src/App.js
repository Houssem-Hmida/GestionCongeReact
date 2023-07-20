
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Components/pages/Home';
import HomeAdmin from './Components/pages/HomeAdmin';
import Login from './Components/PageAccueil/Login';
import SignUp from './Components/PageAccueil/SignUp';
import RezetPassword1 from './Components/PageAccueil/RezetPassword1'
import RezetPassword2 from './Components/PageAccueil/RezetPassword2'
import ActivePage from './Components/PageAccueil/ActivePage'
import Profile from './Components/PageAccueil/Profile'
import UserPage from './Components/PageAccueil/UserPage';
import ProjectManagerPage from './Components/PageAccueil/ProjectManagerPage';
import ChatRoom from './Components/PageAdmin/PageChat/ChatRoom';
import AddReclamationAdmin from './Components/PageAdmin/Reclamation/AddReclamationAdmin';
import ListReclamationAdmin from './Components/PageAdmin/Reclamation/ListReclamationAdmin';
import ListUserAdmin from './Components/PageAdmin/User/ListUserAdmin';
import AddUserAdmin from './Components/PageAdmin/User/AddUserAdmin'
import Parametre from './Components/PageParametre/Parametre';
import ChangePassword from './Components/PageParametre/ChangePassword';
import ChangeInfo from './Components/PageParametre/ChangeInfo';
import ShowReclamation from './UserOperation/Reclamation/ShowReclamation';
import AjouterReclamation from './UserOperation/Reclamation/AjouterReclamation'
import ShowDemande from './UserOperation/Demande/ShowDemande';
import map from './UserOperation/map';
import ApproveDemande from './UserOperation/Demande/ApproveDemande';
import AjouterFeedback from './UserOperation/Feedback/AjouterFeedback'
import lesfeedbacks from'./UserOperation/Feedback/Showfeedback'
import Calendrier from "./Calendrier/Calendrier";
import ListeFeedbackAdmin from './Components/PageAdmin/Feedback/ListeFeedbackAdmin';
import ListedemandeAdmin from './Components/PageAdmin/Demande/listdemandeAdmin';


// const express=required("express")
// const app=express();
// const cors = require("cors");
// app.use(cors());

function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path='/home' exact={true} component={Home} />
          <Route path="/Admin" component={HomeAdmin} />      
          <Route path="/signin" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path ="/rezetPasswordSendEamil" exact={true} component = {RezetPassword1}></Route>
          <Route path ="/rezetPasswordSendCode" exact={true} component = {RezetPassword2}></Route>
          <Route path ="/active" exact={true} component = {ActivePage}></Route>
          <Route path='/profile' exact={true} component={Profile}/>
          <Route path='/user' exact={true} component={UserPage}/>
          <Route path='/pm' exact={true} component={ProjectManagerPage}/>
          <Route path='/chat' exact={true} component={ChatRoom}/>
          <Route path="/lesreclamations" component={ShowReclamation}/>
          <Route path="/add-reclamation-user" component={AjouterReclamation}/>
          <Route path="/edit-reclamation-user/:id" component={AjouterReclamation}/>

         {/* user feedback */}
         <Route path="/add-feedback-user" component={AjouterFeedback}/>
          <Route path="/lesfeedbacks" component={lesfeedbacks}/>
          <Route path="/edit-feedback/:id" component={AjouterFeedback}/>
          <Route path="/ListeFeedbackAdmin" component={ListeFeedbackAdmin}/>
          
          <Route path="/lesdemandes" component={ShowDemande}/>
          <Route path="/demandes" component={ApproveDemande}/>
    



          <Route path='/parametre' exact={true} component={Parametre}/>
          <Route path='/changePassword' exact={true} component={ChangePassword}/>
          <Route path='/ChangeInfo' exact={true} component={ChangeInfo}/>

          <Route path='/Listusers' exact={true} component={ListUserAdmin}/>
          <Route path='/add-user' exact={true} component={AddUserAdmin}/>
          <Route path="/edit-user/:id" component={AddUserAdmin}/>

          <Route path="/reclamations" component={ListReclamationAdmin}/>
          <Route path="/add-reclamation" component={AddReclamationAdmin}/>
          <Route path="/edit-reclamation/:id" component={AddReclamationAdmin}/>
          <Route path="/map" component={map} />
          <Route path="/calendrier" component={Calendrier} />
          
        </Switch>
      </Router>
    </>
  );
}

export default App;
