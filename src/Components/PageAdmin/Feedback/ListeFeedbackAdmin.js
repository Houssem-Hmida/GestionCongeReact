import React from "react";
import { useState } from "react";
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import Showfeedback from "../../../UserOperation/Feedback/Showfeedback";
import '../Reclamation/ListReclamation.css'



const ListeFeedbackAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () =>{
    setSidebarOpen(true);
  };
  const closeSidebar = () =>{
    setSidebarOpen(false);
  };
    return (
      
        
        <div className="containerHome">
        
       
          <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar}/>
           <Showfeedback/>
           <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
           
        </div>
    
    );
}

export default ListeFeedbackAdmin;