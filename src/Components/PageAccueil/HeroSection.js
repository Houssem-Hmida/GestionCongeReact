import React from 'react'
import './HeroSection.css';
import '../../App.css';
import Video from '../../images/video2.mp4';
import { Button } from 'react-bootstrap';
import Navigate from './Navigate';
function HeroSection() {
  return (
    <>
    <Navigate/>
    <div className='hero-container'>
    <video src={Video} autoPlay loop muted no repeate />
      <h3>Bienvenue a notre site web </h3>
      <p></p>
      <div className='hero-btns'>
          <Button className='btns' buttonStyle='btn--outline'
                buttonSize='btn--large'>
                 GET STARTED
            </Button>
        </div>
    </div>
    </>
  )
}

export default HeroSection;
