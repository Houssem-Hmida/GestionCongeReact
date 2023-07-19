import AppNavbar from './AppNavbar';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bservice from './Bservice';
import './Service.css';
import Img1 from '../../images/f.jpg';
import Img2 from '../../images/logo1213.jpg';
import styled from "styled-components";
import Img3 from '../../images/logo1212.png';
import { mobile } from "../../responsive";
import './Service.css';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import ChatOutlinedIcon from '@material-ui/icons/Chat'
import MapIcon from '@material-ui/icons/Room';
import ForumIcon from '@material-ui/icons/Forum';
import { AiFillSetting } from "react-icons/ai";
import { AiTwotoneSnippets } from "react-icons/ai";

const Container = styled.div`
     background-color: #fff;
     display: flex;
     ${mobile({ flexDirection: "column" })}
  `;
  
 
const UserPage = () =>{

  return (
      <>
        <AppNavbar/>
   
        <div className='services'>
          <div className='s-heading'>
          <h3>Vos opérations</h3>
          </div>
            <Container id='Nos service' className='cont_side'>
            <Link to={'/add-reclamation-user'}><Bservice image={Img1} name=" Réclamation" /></Link>
              <Link to={'/lesdemandes'}><Bservice image={Img2} name="Demande congé" /></Link>
              <Link to={'/add-feedback-user'}><Bservice image={Img3} name="feedback" /></Link>
              <Link to={'/calendrier'}><Bservice image={Img2} name="schedule" /></Link>
              <SpeedDial ariaLabel='Navigation speed dial' 
                 sx={{position:'absolute', bottom:16, right: 16, color:'green'}}
                 icon={<SpeedDialIcon color="success"/>}>
                   <SpeedDialAction icon={<ChatOutlinedIcon/>} tooltipTitle='Chat' href="/chat"/>
                   <SpeedDialAction icon={<MapIcon/>} tooltipTitle='map' href="/map"/>
                   <SpeedDialAction icon={<AiFillSetting/>} tooltipTitle='Parametre' href="/parametre" />
                   
                 </SpeedDial>
        </Container>
      </div>
      </>
    );
  }


export default UserPage;