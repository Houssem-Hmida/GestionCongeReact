import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import DemandeService from '../../services/AdminService/DemandeService';
import AppNavbar from '../../Components/PageAccueil/AppNavbar';

const ShowDemande = () => {

    const [DemandeCongees, setDemandeCongee] = useState([])
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
    const [jesh, setJesh] = useState([]);
    useEffect(() => {
      async function consume(){
        const result = await DemandeService.getAllDemande() ; 
         setJesh(result.data);
      }
      consume();
    }, [DemandeService.getAllDemande]);
   
    console.log("jesh ya rbby yji:::",jesh)
    // const deleteDemande = (demandeId) =>{
    //     DemandeService.deleteDemande(demandeId).then( res => {
    //         this.setState({demandes: this.state.demandes.filter(demande => demande.demandeId!== demandeId)});
    //     });
    // }


    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
      };


    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
      };


  return (
    <>
        <AppNavbar/>
      <div className='main__container'>
            <h2 className = "main__title"> Vos Demandes </h2>


            {
                        jesh.map(
                          DemandeCongee=>
                            <section className="sujet">
                            <article>
                            <div key = {DemandeCongee.idDemande}> 
                            <p> La Demande été crée  {DemandeCongee.title} par <div className="btn btn-outline-primary">{DemandeCongee.description}</div> </p><br></br>
                            <p> {DemandeCongee.description} </p> Avec le numéro de demande : {DemandeCongee.idDemande}

      </div>
                            </article></section>
                        )
                    }
    </div>
    {/* <button onClick={gotoPrevious}>Previous</button>
              {pages.map((pageIndex) => (
             <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
             {pageIndex + 1}
             </button>
                         ))}
            <button onClick={gotoNext}>Next</button> */}
    </>
  )
}

export default ShowDemande;

